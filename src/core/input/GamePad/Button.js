define(['eventemitter'], function (EventEmitter) {
  let Button = function(button) {
    EventEmitter.call(this)
    this.button = button
  }

  extend(Button, EventEmitter)

  /**
   * Update the button object.
   *
   * @param {number} delta - Time passed since last update
   */
  Button.prototype.update = function(delta) {
    if (this.button.pressed) {
      this.emit('GamePadInput:pressed', this)
    }
  }

  return Button
})