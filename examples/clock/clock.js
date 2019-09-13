let init = function () {
  let config = {
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    canvas: document.querySelector('#game'),
    transparent: true,
    scene: {
      create: create,
      update: update
    }
  }

  let game = new Prophecy.Game(config)
}

let create = function () {

  let clockRadius = 200

  // Draw the clock face
  this.clockfase = new PIXI.Graphics()
  this.clockfase.lineStyle(2, 0x5a5d63, 1)
  this.clockfase.beginFill(0xccd9d0, 1)
  this.clockfase.drawCircle(this.ge.get('App').renderer.screen.width / 2, this.ge.get('App').renderer.screen.height / 2, clockRadius)
  this.clockfase.endFill()

  // Draw the inner shadow of the face border
  this.clockfaseInnerShadow = new PIXI.Graphics()
  this.clockfaseInnerShadow.lineStyle(1, 0x5a5d63, 1) // 0x75787d
  this.clockfaseInnerShadow.beginFill(0xFFFFFF, 1)
  this.clockfaseInnerShadow.drawCircle(this.ge.get('App').renderer.screen.width / 2, this.ge.get('App').renderer.screen.height / 2, clockRadius - 10)
  this.clockfaseInnerShadow.endFill()

  // A full circle == Pi * 2 radians == 360 degrees
  // https://github.com/Taiters/pixi-clock/blob/master/app/clock.js

  let g = new PIXI.Graphics()
  let centerX = this.ge.get('App').renderer.screen.width / 2
  let centerY = this.ge.get('App').renderer.screen.height / 2

  let radius = clockRadius - 15

  /**
   * Draw the hours and minute indicators.
   */
  for (let i = 0; i < 60; i++) {
    let angle = ((i / 60) * 360 + 180) * Math.PI / 180
    let d = 35
    let l = radius / d

    if (i % 5 === 0) {
      g.lineStyle(2, 0x000000, 1)
      g.moveTo(centerX + (l * (d - 3) * Math.cos(angle)), centerY + (l * (d - 3) * Math.sin(angle)))
    } else {
      g.lineStyle(1, 0x000000, 0.75)
      g.moveTo(centerX + (l * (d - 2) * Math.cos(angle)), centerY + (l * (d - 2) * Math.sin(angle)))
    }

    g.lineTo(centerX + (l * (d - 1) * Math.cos(angle)), centerY + (l * (d - 1) * Math.sin(angle)))
  }

  let mickeyTexture = PIXI.Texture.fromImage('mickey.png')
  let mickeyMouse = new PIXI.Sprite(mickeyTexture)
  mickeyMouse.x = centerX - mickeyMouse.width /2
  mickeyMouse.y = centerY - mickeyMouse.height /2
  mickeyMouse.scale.set(0.25)
  mickeyMouse.anchor.set(0.5)

  this.addChild(this.clockfase)
  this.addChild(this.clockfaseInnerShadow)
  this.addChild(mickeyMouse)
  this.addChild(g)
}

let update = function (delta) {

}

document.addEventListener('DOMContentLoaded', init, false)