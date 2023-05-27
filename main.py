y = 0
distance = 0
radio.set_group(11)
radio.set_transmit_power(7)

def on_forever():
    global distance
    distance = sonar.ping(DigitalPin.P2, DigitalPin.P12, PingUnit.CENTIMETERS)
basic.forever(on_forever)

def on_forever2():
    global y
    if distance < 150:
        y = distance
        radio.send_value("Unavailable", 3)
    elif y > 150:
        radio.send_value("Flushing", 2)
    else:
        radio.send_value("Available", 1)
basic.forever(on_forever2)
