define(['eventemitter', 'input/GamePad/Button', 'input/GamePad/Axis'],
  function (EventEmitter, Button, Axis) {
    let GamePad = function (gamepad) {
      EventEmitter.call(this)

      this.gamepad = gamepad

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
       * This has no meaning yet according to the specs (RFC) this
       * value will always be 'standard'
       *
       * @type {GamepadMappingType}
       */
      this.mapping = gamepad.mapping

      let index = 0
      for (let button of gamepad.buttons) {
        let btn = new Button(button, index, gamepad)
        this.buttons.push(btn)
        index++
      }

      index = 0
      for (let axle of gamepad.axes) {
        let axl = new Axis(axle, index)
        this.axes.push(axl)
        index++
      }
    }

    extend(GamePad, EventEmitter)

    /**
     * Return the GamePad buttons.
     *
     * @returns {Array}
     */
    GamePad.prototype.getButtons = function () {
      return this.buttons
    }

    /**
     * Return the GamePad Axis.
     *
     * @returns {Array}
     */
    GamePad.prototype.getAxis = function () {
      return this.axes
    }

    /**
     * Query the gamepad if it supports vibration or not.
     *
     * @returns {boolean}
     */
    GamePad.prototype.supportsVibration = function () {
      return (this.vibration !== null)
    }

    GamePad.prototype.getMapping = function () {
      return this.mapping
    }

    /**
     * Vibrate the gamepad with a given effect.
     *
     * @param {object} effect - The vibration effect object.
     */
    GamePad.prototype.vibrate = function (effect = null) {
      if (this.supportsVibration() === true && effect) {
        this.vibration.playEffect('dual-rumble', effect)
      }
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
        axle.update(this.gamepad.axes[axle.getIndex()])
      }
    }

    return GamePad
  })
