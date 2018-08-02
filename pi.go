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

	// handle static files for angular
	router.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("dist/static"))))

	// route everything else to index.html - enables HTML5 routing
	router.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "dist/index.html")
	})

	go senseHat.LightLed()
	log.Fatalln(http.ListenAndServe(":80", router))
}
