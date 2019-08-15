const GameObject = require('core/GameObject')

class Circle extends GameObject {
  constructor (radius) {
    super()

    this.radius = radius
    this.graphics = new PIXI.Graphics()

    this.init_line_color = 0xFEEB77
    this.line_color = this.init_line_color

    this.init_fill_color = 0x650A5A
    this.fill_color = this.init_line_color


    /**
     *
     * @type {number[]}
     */
    this.randomColors = [
      0xFFFF00,
      0xFF0000,
      0x00FF00,
      0x00FFFF,
      0xFF00FF,
      0x9D00FF,
    ]
    this.addChild(this.graphics)

  }

  update(delta) {
    this.graphics.clear();
    this.graphics.lineStyle(2, this.line_color, 1)
    this.graphics.beginFill(this.fill_color, 1)
    this.graphics.drawCircle(0, 0, this.radius)
    this.graphics.endFill()
  }

}

module.exports = Circle
