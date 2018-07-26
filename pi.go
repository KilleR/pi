package main

import (
	_ "github.com/kidoman/embd/host/rpi" // This loads the RPi driver
	"github.com/gorilla/mux"
	"net/http"
	"log"
	"senseHat"
)

func main() {
	router := mux.NewRouter().StrictSlash(false)

	staticHandler := http.StripPrefix("/static/", http.FileServer(http.Dir("dist/static")))
	router.PathPrefix("/static/").Handler(staticHandler)
	//router.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	//	http.ServeFile(w, r, "dist/index.html")
	//})

	router.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "dist/index.html")
	})

	go senseHat.LightLed()
	log.Fatalln(http.ListenAndServe(":80", router))
}
