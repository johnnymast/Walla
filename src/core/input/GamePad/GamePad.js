
define(['eventemitter', 'input/GamePad/Button', 'input/GamePad/Axis'], function (EventEmitter, Button, Axis) {
  let GamePad = function (gamepad) {
    EventEmitter.call(this)

    /**
     * The buttons available on this controller.
     *
     * @type {Array}
     */
    this.buttons = []

    /**
     * The axes present on this controller.
     *
     * @type {Array}
     */
    this.axes = []

    /**
     * The unique (string) identifier of this gamepad.
     *
     * @type {string}
     */
    this.id = gamepad.id

    /**
     * The native index number of this controller connected for
     * example gamepad 1 or gamepad 2.
     *
     * @type {number}
     */
    this.index = gamepad.index

    /**
     * This object will be available on modern browsers if the GamePad
     * supports a vibrating feature. Not all browsers implement this yet but
     * the mainline browsers do.
     *
     * @type {GamepadHapticActuator}
     */
    this.vibration = gamepad.vibrationActuator || null

    /**
     * This has no meaning yet accoring to the specs (RFC) this
     * value will always be 'standard'
     *
     * @type {GamepadMappingType}
     */
    this.mapping = gamepad.mapping

    // var weakEffect = { duration: 300, weakMagnitude: 1.0 }
    //
    // if (this.supportsVibration() === true) {
    //   this.vibrate(weakEffect) // .then(success, failure);
    // }
    // console.log(gamepad)

    for (let button of gamepad.buttons) {
      let btn = new Button(button)
      btn.on('GamePadInput:pressed', this.button_pressed)

      this.buttons.push(btn)
    }

    for (let axle of gamepad.axes) {
      let axl = new Axis(axle)
      // btn.on('pressed', this.axle_moved)

      this.axes.push(axl)
    }
  }

  extend(GamePad, EventEmitter)

  /**
   * Query the gamepad if it supports vibration or not.
   *
   * @returns {boolean}
   */
  GamePad.prototype.supportsVibration = function() {
    return (this.vibration !== null)
  }

  GamePad.prototype.getMapping = function() {
    return this.mapping
  }

  /**
   * Vibrate the gamepad with a given effect.
   *
   * @param {object} effect - The vibration effect object.
   */
  GamePad.prototype.vibrate = function(effect = null) {
    if (this.supportsVibration() === true && effect) {
      this.vibration.playEffect('dual-rumble', effect)
    }
  }

  /**
   * Callback for when an axle has been moved.
   *
   * @param {Button} axle - The axle that was moved.
   */
  GamePad.prototype.axle_moved = function (axle) {
    console.log('Button pressed')
  }

  /**
   * Called when a button on the gamepad has been pushed.
   *
   * @param {Button} button - The button that was pressed.
   */
  GamePad.prototype.button_pressed = function (button) {
    console.log('Button pressed')
  }

  /**
   * Update the GamePad object.
   *
   * @param {number} delta - Time passed since last update
   */
  GamePad.prototype.update = function (delta) {
    for (let button of this.buttons) {
      button.update(delta)
    }

    for (let axle of this.axes) {
      axle.update(delta)
    }
  }

  return GamePad
})
