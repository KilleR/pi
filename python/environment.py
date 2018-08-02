#!/usr/bin/python
from sense_hat import SenseHat
import json
import time

sense = SenseHat()

while True:
    humidity = sense.get_humidity()
    pressure = sense.get_pressure()
    temp_humidity = sense.get_temperature_from_humidity()
    temp_pressure = sense.get_temperature_from_pressure()

    temp_avg = (temp_humidity + temp_pressure) / 2

    with open('sensor-data', 'w') as file:
        json.dump({'temp': temp_avg, 'pres': pressure, 'humid': humidity}, file)

    time.sleep(1)
