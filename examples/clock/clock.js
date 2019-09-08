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
  this.clockfase.beginFill(0xFFFFFF, 1)
  this.clockfase.drawCircle(this.ge.get('App').renderer.screen.width / 2, this.ge.get('App').renderer.screen.height / 2, clockRadius)
  this.clockfase.endFill()

  // Draw the inner shadow of the face border
  this.clockfaseInnerShadow = new PIXI.Graphics()
  this.clockfaseInnerShadow.lineStyle(2, 0x75787d, 1)
  this.clockfaseInnerShadow.drawCircle(this.ge.get('App').renderer.screen.width / 2, this.ge.get('App').renderer.screen.height / 2, clockRadius - 1)
  this.clockfaseInnerShadow.endFill()

  for (let num = 1; num < 13; num++) {
    let number = new PIXI.Text(num)
    let angle = number * Math.PI / 6
    number.rotation = angle


    this.addChild(number)
    ang = num * Math.PI / 6;
    number.rotation = angle
    // ctx.rotate(ang);
    // ctx.translate(0, -radius*0.85);
    // ctx.rotate(-ang);
    // ctx.fillText(num.toString(), 0, 0);
    // ctx.rotate(ang);
    // ctx.translate(0, radius*0.85);
    // ctx.rotate(-ang);
  }

  this.addChild(this.clockfase)
  this.addChild(this.clockfaseInnerShadow)
}

let update = function (delta) {

}

document.addEventListener('DOMContentLoaded', init, false)