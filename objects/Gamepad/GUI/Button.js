const GameObject = require('core/GameObject')

class Button extends GameObject {
  constructor (button) {
    super()

    /**
     * Reference to the Gamepad button.
     *
     * @type {Button}
     */
    this.button = button

    /**
     * Component options.
     *
     * @type {{fillAlpha: number, width: number, height: number, radius: number}}
     */
    this.options = {
      fillAlpha: 0.25,
      width: 45,
      height: 45,
      radius: 15,
    }

    /**
     * Setup the component.
     */
    this.init()
  }

  /**
   * Initialize the graphics
   */
  init () {

    let style = new PIXI.TextStyle({
      fill: ['#ffffff'], // gradient
    })

    let number = new PIXI.Text(this.button.getIndex(), style)
    number.position.x = this.options.width / 2 - number.width / 2
    number.position.y = this.options.height / 2 - number.height / 2

    this.graphics = new PIXI.Graphics()
    this.render()

    this.addChild(this.graphics)
    this.addChild(number)
  }

  /**
   * Update the progress bar.
   */
  render() {
    this.graphics.clear()
    this.graphics.beginFill(0xFF00BB, this.options.fillAlpha)
    this.graphics.lineStyle(2, 0xFF00FF, 1)
    this.graphics.drawRoundedRect(0, 0, this.options.width, this.options.height, this.options.radius)
    this.graphics.endFill()
  }

  /**
   * Update the button.
   *
   * @param {number} delta - The time passed since last update
   */
  update (delta) {
    this.options.fillAlpha = this.button.getValue()
    this.render();
  }
}

module.exports = Button