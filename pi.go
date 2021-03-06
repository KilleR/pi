package main

import (
	_ "github.com/kidoman/embd/host/rpi" // This loads the RPi driver
	"github.com/gorilla/mux"
	"net/http"
	"log"
	"senseHat"
	"os"
	"io/ioutil"
	"encoding/json"
	"github.com/gorilla/handlers"
	"os/exec"
	"bytes"
	"strings"
)

type sensorData struct {
	humid float64
	press float64
	temp float64
}

func getSensorData() ([]byte, error) {
	cmd := exec.Command("sqlite3", "sensordata.db", "SELECT * FROM sensordata;")

	out, err := cmd.CombinedOutput()
	if err != nil {
		return nil, err
	}
	return out, nil
}

func main() {
	// run commands
	data, err := getSensorData()
	if err != nil {
		log.Fatalln("failed to fetch sensor data")
	}
	rows := bytes.Split(data, []byte{'\n'})

	var rowData [][]string
	for _,v := range rows {
		rowData = append(rowData, strings.Split(string(v), "|"))
	}

	router := mux.NewRouter().StrictSlash(false)

	// handle static files for angular
	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("dist/static"))))

	// load sensor data
	router.Path("/api/sensor-data/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		file, err := os.OpenFile("sensor-data", os.O_RDONLY, 0644)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		data, err := ioutil.ReadAll(file)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		var sd sensorData
		err = json.Unmarshal(data, &sd)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		w.Write(data)
	})

	// route everything else to index.html - enables HTML5 routing
	router.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "dist/index.html")
	})

	go senseHat.LightLed()


	// set up CORS
	headersOk := handlers.AllowedHeaders([]string{"Origin","Content-Type", "X-Auth-Token","Authorization","X-Requested-With"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	log.Fatalln(http.ListenAndServe(":80", handlers.CORS(originsOk, headersOk, methodsOk)(router)))
}
