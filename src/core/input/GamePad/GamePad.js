
define(['eventemitter', 'input/GamePad/Button', 'input/GamePad/Axis'], function (EventEmitter, Button, Axis) {
  let GamePad = function(gamepad) {
    EventEmitter.call(this)

    this.buttons = []
    this.axes = []

    this.gamepad = gamepad

    this.id = gamepad.id
    this.index = gamepad.index
    this.vibration = gamepad.vibrationActuator;
    this.connected = gamepad.connected
    this.mapping = gamepad.mapping

    var weakEffect = { duration: 300, weakMagnitude: 1.0 };

    this.vibration.playEffect('dual-rumble', weakEffect); //.then(success, failure);
    console.log(gamepad)
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

  GamePad.prototype.axle_moved = function(button) {
    console.log('Button pressed')
  }

  GamePad.prototype.button_pressed = function(button) {
    console.log('Button pressed')
  }


  GamePad.prototype.update = function(delta) {
    for (let button of this.buttons) {
      button.update(delta)
    }

    for (let axle of this.axes) {
      axle.update(delta)
    }
  }

  return GamePad
})