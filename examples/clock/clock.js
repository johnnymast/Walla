/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

let config = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
  transparent: true,
  scene: {
    create: create,
    update: update
  }
}

let game = new Prophecy.Game(config)
game.start()

function create () {

  // https://github.com/Taiters/pixi-clock/blob/master/app/clock.js

  this.hands = new PIXI.Graphics()

  this.clockRadius = 200
  this.knobRadius = 10
  this.wallWidth = 20

  this.centerX = this.ge.get('App').renderer.screen.width / 2
  this.centerY = this.ge.get('App').renderer.screen.height / 2

  let backplate = new PIXI.Graphics()
  backplate.lineStyle(2, 0x5a5d63, 1)
  backplate.beginFill(0xccd9d0, 1)
  backplate.drawCircle(this.centerX, this.centerY, this.clockRadius)
  backplate.endFill()

  // Draw the inner shadow of the face border
  let clockface = new PIXI.Graphics()
  clockface.lineStyle(1, 0x5a5d63, 1) // 0x75787d
  clockface.beginFill(0xFFFFFF, 1)
  clockface.drawCircle(this.centerX, this.centerY, this.clockRadius - this.wallWidth)
  clockface.endFill()

  let knob = new PIXI.Graphics()
  knob.lineStyle(1, 0x000000, 1) // 0x75787d
  knob.beginFill(0xFF0000, 1)
  knob.drawCircle(this.centerX, this.centerY, this.knobRadius)
  knob.anchor = 0.5
  knob.endFill()

  let mickeyTexture = PIXI.Texture.fromImage('mickey.png')
  let mickeyMouse = new PIXI.Sprite(mickeyTexture)
  mickeyMouse.x = this.centerX - mickeyMouse.width / 2
  mickeyMouse.y = this.centerY - mickeyMouse.height / 2
  mickeyMouse.scale.set(0.25)
  mickeyMouse.anchor.set(0.5)
  mickeyMouse.alpha = 0.8

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

  drawClock = drawClock.bind(this)
  drawHand = drawHand.bind(this)

  this.addChild(backplate)
  this.addChild(clockface)
  this.addChild(markings)
  this.addChild(mickeyMouse)
  this.addChild(this.hands)
  this.addChild(knob)
}

function getHandAngle (time, maximum) {
  return ((time / maximum) * 360 - 90) * Math.PI / 180
}

function drawHand (g, centerX, centerY, offset, angle, width, length, color) {
  this.hands.lineStyle(width, color, 1)
  this.hands.moveTo(centerX + offset * Math.cos(angle), centerY + offset * Math.sin(angle))
  this.hands.lineTo(centerX + length * Math.cos(angle), centerY + length * Math.sin(angle))
}

function drawClock (hours, minutes, seconds) {

  let length = this.clockRadius - this.wallWidth - 10

  let hourAngle = getHandAngle(hours + (minutes + (seconds / 60)) / 60, 12)

  let minuteAngle = getHandAngle(minutes + seconds / 60, 60)

  let secondAngle = getHandAngle(seconds, 60)

  drawHand(this.hands, this.centerX, this.centerY, 0, hourAngle, 8, length, 0x000000)
  drawHand(this.hands, this.centerX, this.centerY, 0, minuteAngle, 4, length, 0x000000)
  drawHand(this.hands, this.centerX, this.centerY, 0, secondAngle, 2, length, 0xff0000)
}

function update () {
  let time = new Date()
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()

  this.hands.clear()

  drawClock(hours, minutes, seconds)
}
