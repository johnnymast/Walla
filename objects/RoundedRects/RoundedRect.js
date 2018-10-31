const GameObject = require('core/GameObject')

class RoundedRect extends GameObject {
  constructor () {
    super()

    /**
     *
     * @type {number}
     */
    this.alpha = 1

    /**
     *
     * @type {number}
     */
    this.radius = 5

    /**
     *
     * @type {number}
     */
    this.rectangle_width = 45

    /**
     *
     * @type {number}
     */
    this.rectangle_height = 45

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

    this.init()
  }

  /**
   * Create the RoundedRect.
   */
  init () {
    let lineColor = this.randomColors[Math.round(rand(0, this.randomColors.length-1))]
    let rect = new PIXI.Graphics()
    rect.name = 'circle'

    let content_outline_alpha = 1
    rect.lineStyle(2, lineColor, content_outline_alpha)
    rect.beginFill(0xFFFFFF, 0)
    rect.drawRoundedRect(
      0,
      0,
      this.rectangle_width,
      this.rectangle_height,
      this.radius
    )

    this.addChild(rect)
  }

}

module.exports = RoundedRect