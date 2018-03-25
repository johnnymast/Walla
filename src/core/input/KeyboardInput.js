define([], function () {
  var KeyboardInput = function (keyCode) {

    let key = {}
    key.code = keyCode
    key.isDown = false
    key.isUp = true
    key.press = undefined
    key.release = undefined

    window.addEventListener(
      'keydown', this.downHandler.bind(key), false
    )
    window.addEventListener(
      'keyup', this.upHandler.bind(key), false
    )

    return key
  }

  KeyboardInput.prototype.downHandler = function(event) {

    if (event.keyCode === this.code) {
      if (this.isUp && this.press) this.press(event)
      this.isDown = true
      this.isUp = false
    }
    event.preventDefault()
  }

  KeyboardInput.prototype.upHandler = function(event) {
    if (event.keyCode === this.code) {
      if (this.isDown && this.release) this.release(event)
      this.isDown = false
      this.isUp = true
    }
    event.preventDefault()
  }

  return KeyboardInput
})