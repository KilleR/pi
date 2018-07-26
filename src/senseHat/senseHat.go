package senseHat

import (
	_ "github.com/kidoman/embd/host/rpi" // This loads the RPi driver
	"github.com/nathany/bobblehat/sense/screen"
	"github.com/nathany/bobblehat/sense/screen/color"
	"github.com/kidoman/embd"
	"log"
	"fmt"
	"time"
)

func LightLed() {
	fb := screen.NewFrameBuffer()
	fb.SetPixel(0, 0, color.Red)
	screen.Draw(fb)

	bus := embd.NewI2CBus(1)

	go func() {
		res, err := bus.ReadByte(0x5c)
		if err != nil {
			log.Fatalln(err)
		}
		fmt.Println(res)
		time.Sleep(time.Second)
	}()
}
