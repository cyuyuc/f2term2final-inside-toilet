let distance = 0
let y = 0
radio.setGroup(11)
radio.setTransmitPower(7)
basic.forever(function () {
    y = 0
    distance = sonar.ping(
    DigitalPin.P2,
    DigitalPin.P12,
    PingUnit.Centimeters
    )
    basic.showNumber(distance)
    if (distance < 150) {
        y = distance
        radio.sendValue("Unavailable", 3)
    } else if (y > 150) {
        radio.sendValue("Flushing", 2)
        music.playTone(262, music.beat(BeatFraction.Whole))
    } else {
        radio.sendValue("Available", 1)
        y = distance
    }
})
