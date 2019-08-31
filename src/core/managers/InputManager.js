const GameObject = require('core/GameObject')
const KeyboardInput = require('input/Keyboard/KeyboardInput')
const GamePadInput = require('input/GamePadInput')
const PIXI = require('pixi')

class InputManager extends GameObject {
  constructor (options) {
    super(options)

    // GameObject.call(this, options)

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

    this.gamepads = []
    this.buttons = {}
    this.map = []

    /**
     *
     * @type {GamePadInput}
     */
    this.gamepadController = new GamePadInput()
    this.gamepadController.on('gamepad_connected', this.gamepadConnected.bind(this))
    this.gamepadController.on('gamepad_disconnected', this.gamepadDisconnected.bind(this))
  }

  addButton (name = '', index = 0) {
    this.buttons[name] = { name: name, index: index }
  }

  /**
   * Return the registered buttons.
   *
   * @returns {{}}
   */
  getButtons () {
    return this.buttons
  }

  /**
   * Return the registered keys.
   *
   * @returns {{}}
   */
  getKeys () {
    return this.keys
  }

  /**
   * Add a key binding to action names.
   *
   * @param {array|KeyboardInput|string} input - a key string or an KeyboardInput instance
   * @param {array} actions - an array with strings identifying the actions this key(s) is|are used for
   */
  mapInput (input = '', actions = []) {

    if (!(input instanceof Array)) {
      input = new Array(input)
    }

    let index = 0

    for (let name of input) {

      if (Object.keys(this.buttons).indexOf(name) !== -1) {
        let info = this.buttons[name]

        for (let gamepad of this.gamepads) {
          if (gamepad.buttons[info.index] !== 'undefined') {

            gamepad.buttons[info.index].on('GamePad.button.pressed', (event) => {
              this.emit('InputManager.GamepadButtonPressed', event)
            })

            input[index] = gamepad.buttons[info.index]
            index++
          }
        }
      } else {

        let key = new KeyboardInput(name)

        key.info.down = function (event) {
          parent.emit('InputManager.keyDown', event)
        }

        key.info.up = function (event) {
          parent.emit('InputManager.keyUp', event)
        }

        input[index] = key
        index++
      }
    }

    if (!(actions instanceof Array)) {
      throw new Error('InputManager: To is not an array.')
    }

    for (let i = 0; i < actions.length; i++) {
      let name = actions[i]

      if (typeof this.map[name] === 'undefined') {
        this.map[name] = []
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
  isDown (name) {

    if (typeof this.map[name] === 'undefined') {
      throw new Error('InputManager: name is not defined in mapping')
    }

    for (let i = 0; i < this.map[name].length; i++) {
      if (!(this.map[name][i] instanceof KeyboardInput)) {
        //    continue
      }

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
  isUp (name) {
    if (typeof this.map[name] === 'undefined') {
      throw new Error('InputManager: name is not defined in mapping')
    }

    for (let i = 0; i < this.map[name].length; i++) {
      if (!(this.map[name][i] instanceof KeyboardInput)) { continue }

      if (this.map[name][i].isUp() === true) {
        return true
      }
    }
    return false
  }

  /**
   * Check to see if there are any gamepads connected.
   *
   * @returns {boolean|*}
   */
  haveGamePads () {
    return this.gamepadController.isConnected()
  }

  getGamePad (index) {
    return this.gamepadController.getGamepad(index)
  }

  /**
   * Gamepad connected handler
   *
   * @param {Gamepad} gamepad - The connected gamepad
   */
  gamepadConnected (gamepad) {
    this.gamepads[gamepad.index] = gamepad

    this.emit('gamepad_connected', gamepad)

    for (let button of gamepad.buttons) {
      this.addButton('Button' + button.index, button.index)
    }
  }

  /**
   * Gamepad disconnected handler.
   *
   * @param {Gamepad} gamepad - The disconnected gamepad
   */
  gamepadDisconnected (gamepad) {

    this.emit('gamepad_disconnected', gamepad)

    if (typeof this.gamepads[gamepad.index] !== 'undefined') {
      delete this.gamepads[gamepad.index]
    }
  }
}

module.exports = InputManager
//
// /**
//  * InputManager
//  * @namespace Core Managers
//  */
// define(['pixi', 'core/GameObject', 'input/Keyboard/KeyboardInput', 'input/GamePadInput'],
//   function (PIXI, GameObject, KeyboardInput, GamePadInput) {
//     /**
//      * @classdesc InputManager
//      * @exports  core/managers/InputManager
//      * @class
//      */
//     let InputManager = function (options) {
//       GameObject.call(this, options)
//
//       this.keys = {
//         ArrowUp: 'ArrowUp',
//         ArrowDown: 'ArrowDown',
//         ArrowLeft: 'ArrowLeft',
//         ArrowRight: 'ArrowRight',
//         Alt: 'Alt',
//         Control: 'Control',
//         Space: ' ',
//         Enter: 'Enter',
//         Escape: 'Escape'
//       }
//
//       this.gamepads = []
//       this.buttons = {}
//       this.map = []
//
//       /**
//        *
//        * @type {GamePadInput}
//        */
//       this.gamepadController = new GamePadInput()
//       this.gamepadController.on('gamepad_connected', this.gamepadConnected.bind(this))
//       this.gamepadController.on('gamepad_disconnected', this.gamepadDisconnected.bind(this))
//     }
//
//     extend(InputManager, GameObject)
//
//     InputManager.prototype.addButton = function (name = '', index = 0) {
//       this.buttons[name] = { name: name, index: index }
//     }
//
//     /**
//      * Return the registered buttons.
//      *
//      * @returns {{}}
//      */
//     InputManager.prototype.getButtons = function () {
//       return this.buttons
//     }
//
//     /**
//      * Return the registered keys.
//      *
//      * @returns {{}}
//      */
//     InputManager.prototype.getKeys = function () {
//       return this.keys
//     }
//
//     /**
//      * Add a key binding to action names.
//      *
//      * @param {array|KeyboardInput|string} input - a key string or an KeyboardInput instance
//      * @param {array} actions - an array with strings identifying the actions this key(s) is|are used for
//      */
//     InputManager.prototype.mapInput = function (input = '', actions = []) {
//
//       if (!(input instanceof Array)) {
//         input = new Array(input)
//       }
//
//       let index = 0
//
//       for (let name of input) {
//
//         if (Object.keys(this.buttons).indexOf(name) !== -1) {
//           let info = this.buttons[name]
//
//           for (let gamepad of this.gamepads) {
//             if (gamepad.buttons[info.index] !== 'undefined') {
//
//               gamepad.buttons[info.index].on('GamePad.button.pressed', (event) => {
//                 this.emit('InputManager.GamepadButtonPressed', event)
//               })
//
//               input[index] = gamepad.buttons[info.index]
//               index++
//             }
//           }
//         } else {
//
//           let key = new KeyboardInput(name)
//
//           key.info.down = function (event) {
//             parent.emit('InputManager.keyDown', event)
//           }
//
//           key.info.up = function (event) {
//             parent.emit('InputManager.keyUp', event)
//           }
//
//           input[index] = key
//           index++
//         }
//       }
//
//       if (!(actions instanceof Array)) {
//         throw new Error('InputManager: To is not an array.')
//       }
//
//       for (let i = 0; i < actions.length; i++) {
//         let name = actions[i]
//
//         if (typeof this.map[name] === 'undefined') {
//           this.map[name] = []
//         }
//
//         for (let j = 0; j < input.length; j++) {
//           this.map[name].push(input[j])
//         }
//       }
//     }
//
//     /**
//      * Check to see if the mapping with the given name is down.
//      *
//      * @param {string} name - the mapping name
//      * @return {boolean}
//      */
//     InputManager.prototype.isDown = function (name) {
//
//       if (typeof this.map[name] === 'undefined') {
//         throw new Error('InputManager: name is not defined in mapping')
//       }
//
//       for (let i = 0; i < this.map[name].length; i++) {
//         if (!(this.map[name][i] instanceof KeyboardInput)) {
//           //    continue
//         }
//
//         if (this.map[name][i].isDown() === true) {
//           return true
//         }
//       }
//       return false
//     }
//
//     /**
//      * Check to see if the mapping with the given name is up.
//      *
//      * @param {string} name - the mapping name
//      * @return {boolean}
//      */
//     InputManager.prototype.isUp = function (name) {
//       if (typeof this.map[name] === 'undefined') {
//         throw new Error('InputManager: name is not defined in mapping')
//       }
//
//       for (let i = 0; i < this.map[name].length; i++) {
//         if (!(this.map[name][i] instanceof KeyboardInput)) { continue }
//
//         if (this.map[name][i].isUp() === true) {
//           return true
//         }
//       }
//       return false
//     }
//
//     /**
//      * Check to see if there are any gamepads connected.
//      *
//      * @returns {boolean|*}
//      */
//     InputManager.prototype.haveGamePads = function () {
//       return this.gamepadController.isConnected()
//     }
//
//     InputManager.prototype.getGamePad = function (index) {
//       return this.gamepadController.getGamepad(index)
//     }
//     /**
//      * Gamepad connected handler
//      *
//      * @param {Gamepad} gamepad - The connected gamepad
//      */
//     InputManager.prototype.gamepadConnected = function (gamepad) {
//       this.gamepads[gamepad.index] = gamepad
//
//       this.emit('gamepad_connected', gamepad)
//
//       for (let button of gamepad.buttons) {
//         this.addButton('Button' + button.index, button.index)
//       }
//     }
//
//     /**
//      * Gamepad disconnected handler.
//      *
//      * @param {Gamepad} gamepad - The disconnected gamepad
//      */
//     InputManager.prototype.gamepadDisconnected = function (gamepad) {
//
//       this.emit('gamepad_disconnected', gamepad)
//
//       if (typeof this.gamepads[gamepad.index] !== 'undefined') {
//         delete this.gamepads[gamepad.index]
//       }
//     }
//
//     return InputManager
//   })
