/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

let config = {
  backgroundColor: 0x1099bb,
  transparent: true
}

let game = new Prophecy.Game(config)

game.createScene('clock', {
  preload () {
    game.loader.loadManifest([
      { name: 'micky_mouse', src: '/assets/examples/sprites/mickey.png' },
    ])
  },
  create () {
    // https://github.com/Taiters/pixi-clock/blob/master/app/clock.js

    this.hands = new PIXI.Graphics()

    this.clockRadius = 200
    this.knobRadius = 10
    this.wallWidth = 20

    this.centerX = game.world.center.x
    this.centerY = game.world.center.y

    /**
     * Draw the outer ring.
     * @type {number}
     */
    let backsize = new PIXI.Graphics()
    backsize.lineStyle(2, 0x5a5d63, 1)
    backsize.beginFill(0xccd9d0, 1)
    backsize.drawCircle(this.centerX, this.centerY, this.clockRadius)
    backsize.endFill()
    this.addChild(backsize)

    /**
     * Draw the inner clock face.
     * @type {number}
     */
    let face = new PIXI.Graphics()
    face.lineStyle(1, 0x5a5d63, 1) // #75787d
    face.beginFill(0xFFFFFF, 1)
    face.drawCircle(this.centerX, this.centerY, this.clockRadius - this.wallWidth)
    face.endFill()
    this.addChild(face)

    /**
     * Create the image of Micky to decorate the clock face.
     * @type {PIXI.Sprite}
     */
    let mickey = game.add.sprite('micky_mouse', this.centerX, this.centerY)
    mickey.scale.set(0.25)
    mickey.anchor.set(0.5)
    mickey.alpha = 0.8
    face.addChild(mickey)

    let knob = new PIXI.Graphics()
    knob.lineStyle(1, 0x000000, 1) // 0x75787d
    knob.beginFill(0xFF0000, 1)
    knob.drawCircle(this.centerX, this.centerY, this.knobRadius)
    knob.endFill()

    let radius = this.clockRadius - this.wallWidth
    let markings = new PIXI.Graphics()

    /**
     * Draw the hours and minute indicators.
     */
    for (let i = 0; i < 60; i++) {
      let angle = ((i / 60) * 360 + 180) * Math.PI / 180
      let d = 35
      let l = radius / d

      if (i % 5 === 0) {
        markings.lineStyle(2, 0x000000, 1)
        markings.moveTo(this.centerX + (l * (d - 3) * Math.cos(angle)), this.centerY + (l * (d - 3) * Math.sin(angle)))
      } else {
        markings.lineStyle(1, 0x000000, 0.75)
        markings.moveTo(this.centerX + (l * (d - 2) * Math.cos(angle)), this.centerY + (l * (d - 2) * Math.sin(angle)))
      }

      markings.lineTo(this.centerX + (l * (d - 1) * Math.cos(angle)), this.centerY + (l * (d - 1) * Math.sin(angle)))
    }

    /**
     * Add the Marking and the hands ontop.
     */
    this.addChild(markings)
    this.addChild(this.hands)
  },
  getHandAngle (time, maximum) {
    return ((time / maximum) * 360 - 90) * Math.PI / 180
  },
  drawHand (g, centerX, centerY, offset, angle, width, length, color) {
    this.hands.lineStyle(width, color, 1)
    this.hands.moveTo(centerX + offset * Math.cos(angle), centerY + offset * Math.sin(angle))
    this.hands.lineTo(centerX + length * Math.cos(angle), centerY + length * Math.sin(angle))
  },
  drawClock (hours, minutes, seconds) {

    let length = this.clockRadius - this.wallWidth - 10

    let hourAngle = this.getHandAngle(hours + (minutes + (seconds / 60)) / 60, 12)

    let minuteAngle = this.getHandAngle(minutes + seconds / 60, 60)

    let secondAngle = this.getHandAngle(seconds, 60)

    this.drawHand(this.hands, this.centerX, this.centerY, 0, hourAngle, 8, length, 0x000000)
    this.drawHand(this.hands, this.centerX, this.centerY, 0, minuteAngle, 4, length, 0x000000)
    this.drawHand(this.hands, this.centerX, this.centerY, 0, secondAngle, 2, length, 0xff0000)
  },
  update () {
    let time = new Date()
    let hours = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()

    this.hands.clear()

    this.drawClock(hours, minutes, seconds)
  }
})

game.start('clock')