/**
 * InputManager
 * @namespace Core Managers
 */
define(['pixi', 'core/GameObject', 'input/KeyboardInput'], function (PIXI, GameObject, KeyboardInput) {


  /**
   * @classdesc InputManager
   * @exports  core/managers/InputManager
   * @class
   */
  let InputManager = function (options) {
    GameObject.call(this, options)

    this.keys = {
      ArrowUp: 'ArrowUp',
      ArrowDown: 'ArrowDown',
      ArrowLeft: 'ArrowLeft',
      ArrowRight: 'ArrowRight',
      Alt: 'Alt',
      Control: 'Control',
      Space: ' ',
      Enter: 'Enter',
      Escape: 'Escape'
    }

    this.map = []
  }

  extend(InputManager, GameObject)

  /**
   *
   * @param input
   * @param to
   */
  InputManager.prototype.mapInput = function (input = '', to = []) {
    if (!(input instanceof KeyboardInput)) {

      if (!(input instanceof Array)) {
        input = new Array(input)
      }

      for (let i = 0; i < input.length; i++) {
        let key = new KeyboardInput(input[i])
        let parent = this

        key.info.down = function (event) {
          parent.emit('InputManager.keyDown', event)
          console.log('event is ontvangen ', this)
        }.bind(this)

        key.info.up = function (event) {
          parent.emit('InputManager.keyUp', event)
        }.bind(this)

        input[i] = key
      }
    } else {
      throw new Error('InputManager: Unsupported input')
    }


    if (!(to instanceof Array)) {
      throw new Error('InputManager: To is not an array.')
    }

    for (let i = 0; i < to.length; i++) {
      let name = to[i]

      if (typeof this.map[name] === 'undefined') {
        this.map[name] = new Array()
      }

      for (let j = 0; j < input.length; j++) {
        this.map[name].push(input[j])
      }
    }
  }

  /**
   * Check to see if the mapping with the given name is down.
   *
   * @param {string} name - the mapping name
   * @return {boolean}
   */
  InputManager.prototype.isDown = function (name) {
    if (typeof this.map[name] === 'undefined') {
      throw new Error('InputManager: name is not defined in mapping')
    }

    for (let i = 0; i < this.map[name].length; i++) {

      if (!(this.map[name][i] instanceof KeyboardInput)) {
        continue
      }

      console.log('?? isDown ', this.map[name][i])
      if (this.map[name][i].isDown() === true) {
        return true
      }
    }
    return false
  }

  /**
   * Check to see if the mapping with the given name is up.
   *
   * @param {string} name - the mapping name
   * @return {boolean}
   */
  InputManager.prototype.isUp = function (name) {
    if (typeof this.map[name] === 'undefined') {
      throw new Error('InputManager: name is not defined in mapping')
    }

    for (let i = 0; i < this.map[name].length; i++) {

      if (!(this.map[name][i] instanceof KeyboardInput))
        continue

      if (this.map[name][i].isUp() === true) {
        return true
      }
    }
    return false
  }

  return InputManager
})