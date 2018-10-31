const GameObject = require('core/GameObject')
const Button = require('objects/Gamepad/GUI/Button')
const Progress = require('objects/Gamepad/GUI/Progress')

class GamepadView extends GameObject {
  /**
   * @constructor
   * @param {GamePad} gamepad - The connected GamePad.
   */
  constructor (gamepad) {
    super()

    /**
     * Store a reference to the the connected gamepad.
     *
     * @type {GamePad}
     */
    this.gamepad = gamepad

    /**
     * Storage container for the gamepad buttons.
     *
     * @type {Array}
     */
    this.buttons = []

    /**
     * Storage container for the gamepad axis.
     *
     * @type {Array}
     */
    this.axis = []

    /**
     * Add the objects to the view.
     */
    this.init()
  }

  /**
   * Initialize the GamepadView and place it's components
   * on the view.
   */
  init () {

    let style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 20,
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    })

    this.title = new PIXI.Text(this.gamepad.id, style)
    this.title.x = this.app.screen.width / 2 - this.title.width / 2
    this.title.y = 10

    this.addChild(this.title)

    let padding = 10
    let x = padding
    let y = this.title.y + this.title.height + padding

    /**
     * Place the buttons for the axis on the screen
     */
    for (let _button of this.gamepad.getButtons()) {
      let button = new Button(_button)

      if (x + button.width > this.app.screen.width - padding) {
        x = padding
        y += button.height + padding
      }

      button.position.x = x
      button.position.y = y

      x += button.width + padding

      this.buttons.push(button)
      this.addChild(button)
    }

    x = padding
    y += this.buttons[this.buttons.length - 1].height + (padding * 2)

    /**
     * Place the progressbars for the axis on the screen
     */
    for (let _axis of this.gamepad.getAxis()) {

      let axis = new Progress(_axis)

      if (x + axis.width > this.app.screen.width - padding) {
        x = padding
        y += axis.height + padding
      }

      axis.position.x = x
      axis.position.y = y

      x += axis.width + padding

      this.axis.push(axis)
      this.addChild(axis)
    }
  }

  /**
   * Remove all components from the view.
   */
  deconstruct () {
    this.removeChild(this.title)

    for (let button of this.buttons) {
      this.removeChild(button)
    }

    for (let axis of this.axis) {
      this.removeChild(axis)
    }
  }

  /**
   * Update the GamepadView.
   *
   * @param {number} delta - The time passed since last update
   */
  update (delta) {
    for (let button of this.buttons) {
      button.update(delta)
    }

    for (let axis of this.axis) {
      axis.update(delta)
    }
  }
}

module.exports = GamepadView
