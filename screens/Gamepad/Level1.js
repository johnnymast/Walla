/**
 * To keep the level file as small as possible i have added a view file that
 * handles the gamepad input. The file is located at screens/GamepadView.js
 */
define(['pixi', 'screens/Gamepad/GameLevel', 'input/GamePadInput', 'objects/GamePad/GamepadView'],
  function (PIXI, GameLevel, GamePadInput, GamepadView) {
    let Level1 = function () {
      GameLevel.call(this, {backgroundColor: 0x1099bb})

      this.setDisplayStats(true)

      this.gamepadController = new GamePadInput()
      this.gamepadController.on('gamepad_connected', this.connected.bind(this))
      this.gamepadController.on('gamepad_disconnected', this.disconnected.bind(this))
      this.gamepad = null
      this.view = null
    }

    extend(Level1, GameLevel)

    /**
     *
     */
    Level1.prototype.onStart = function () {
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
    }

    /**
     * If supported vibrate the controller.
     */
    Level1.prototype.vibrate = function () {
      if (this.gamepad && this.gamepad.supportsVibration() === true) {
        let weakEffect = {duration: 300, weakMagnitude: 1.0}
        this.gamepad.vibrate(weakEffect)
      }
    }

    /**
     * Gamepad connected handler
     *
     * @param {Gamepad} gamepad - The connected gamepad
     */
    Level1.prototype.connected = function (gamepad) {
      console.log('Connected: ', gamepad)
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
    Level1.prototype.disconnected = function (gamepad) {

      this.view.deconstruct()

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
    Level1.prototype.update = function (delta) {
      GameLevel.prototype.update.call(this, delta)

      if (this.view) {
        this.view.update()
      }
    }

    return Level1
  })