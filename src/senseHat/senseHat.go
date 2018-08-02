package senseHat

import (
	_ "github.com/kidoman/embd/host/rpi" // This loads the RPi driver
	"github.com/nathany/bobblehat/sense/screen"
	"github.com/nathany/bobblehat/sense/screen/color"
				)

type senseScreen struct {
	fb *screen.FrameBuffer
}

func NewSenseScreen() (ss *senseScreen) {
	ss.fb = screen.NewFrameBuffer()
	return
}

func (ss *senseScreen) SetPixel(x, y int, c color.Color) {
	ss.fb.SetPixel(x, y, c)
	screen.Draw(ss.fb)
}

func LightLed() {
	fb := screen.NewFrameBuffer()
	fb.SetPixel(0, 0, color.Red)
	screen.Draw(fb)
}

func init() {

}