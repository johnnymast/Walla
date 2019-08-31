const PIXI = require('pixi')
const GameLevel = require('screens/Gamepad/GameLevel')
const GamePadInput = require('input/GamePadInput')
const GamepadView = require('objects/GamePad/GamepadView')

class Level1 extends GameLevel {
  constructor () {
    super({ backgroundColor: 0x1099bb })

    this.setDisplayStats(true)

    this.InputManager.on('gamepad_connected', this.connected.bind(this))
    this.InputManager.on('gamepad_disconnected', this.disconnected.bind(this))
    this.gamepad = null
    this.view = null
  }

  /**
   *
   */
  onStart () {
    GameLevel.prototype.onStart.call(this)

    let style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 20,
      fill: ['#ffffff'],
    })

    /**
     * This message will be displayed as long as no gamepad is connected.
     *
     * @type {PIXI.Text}
     */
    this.message = new PIXI.Text('Please connect your gamepad', style)
    this.message.x = this.app.screen.width / 2 - this.message.width / 2
    this.message.y = this.app.screen.height / 2 - this.message.height / 2
    this.addChild(this.message)

    if (this.InputManager.haveGamePads()) {
      this.connected(this.InputManager.getGamePad(0))
    }
  }

  /**
   * If supported vibrate the controller.
   */
  vibrate () {
    if (this.gamepad && this.gamepad.supportsVibration() === true) {
      let weakEffect = { duration: 300, weakMagnitude: 1.0 }
      this.gamepad.vibrate(weakEffect)
    }
  }

  /**
   * Gamepad connected handler
   *
   * @param {Gamepad} gamepad - The connected gamepad
   */
  connected (gamepad) {
    this.gamepad = gamepad
    this.vibrate()

    this.message.visible = false
    this.view = new GamepadView(this.gamepad)
    this.addChild(this.view)
  }

  /**
   * Gamepad disconnected handler.
   *
   * @param {Gamepad} gamepad - The disconnected gamepad
   */
  disconnected (gamepad) {

    if (this.view) {
      this.view.deconstruct()
    }

    this.removeChild(this.view)
    this.message.visible = true
    this.gamepad = null
    this.view = null
  }

  /**
   * Update the Level.
   *
   * @param {number} delta - The time passed since last update
   */
  update (delta) {
    GameLevel.prototype.update.call(this, delta)

    if (this.view) {
      this.view.update()
    }
  }
}

module.exports = Level1
