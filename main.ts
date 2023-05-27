let availability = 0
let flushing = 0
let distance = 0
radio.setGroup(11)
radio.setTransmitPower(7)
basic.forever(function () {
    distance = sonar.ping(
    DigitalPin.P2,
    DigitalPin.P12,
    PingUnit.Centimeters
    )
    basic.showNumber(Environment.ReadDust(DigitalPin.P16, AnalogPin.P1))
})
basic.forever(function () {
    if (distance < 100 && flushing == 1) {
        radio.sendValue("Unavailable", 3)
        availability = 1
    } else if (distance > 100 && availability == 1) {
        robotbit.Servo(robotbit.Servos.S1, 0)
        radio.sendValue("Flushing", 2)
        availability = 0
        flushing = 1
        robotbit.Servo(robotbit.Servos.S1, 180)
    } else {
        radio.sendValue("Available", 1)
    }
    flushing = 0
})
