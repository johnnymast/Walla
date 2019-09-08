const GameObject = require('core/GameObject')

class DebugDialog extends GameObject {

  /**
   * @classdesc DebugDialog
   * @exports  plugins/debug/manager/DebugDialog
   * @class
   */
  constructor () {
    super()
    this.init()
  }

  /**
   * Return a static instance of the DebugDialog.
   *
   * @returns {DebugDialog}
   */
  static getInstance () {
    if (!this.instance) {
      this.instance = new DebugDialog()
    }
    return this.instance
  }

  /**
   * Initialize the DebugDialog.
   */
  init () {
    const graphics = new PIXI.Graphics()

    graphics.beginFill(0x5b635e, 0.5)
    graphics.drawRect(0, 0, this.app.screen.width, 30)
    graphics.endFill()

    let obj = {
      ' ': 32,
      'Enter': 18,
      backspace: 8,
      tab: 9,
      enter: 13,
      shiftleft: 16,
      shiftright: 16,
      ctrlleft: 17,
      ctrlrigght: 17,
      altleft: 18,
      altright: 18,
      pause: 19,
      capslock: 20,
      escape: 27,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
      arrowleft: 37,
      arrowup: 38,
      arrowright: 39,
      arrowdown: 40,
      insert: 45,
      delete: 46,
      0: 48,
      1: 49,
      2: 50,
      3: 51,
      4: 52,
      5: 53,
      6: 54,
      7: 55,
      8: 56,
      9: 57,
      a: 65,
      b: 66,
      c: 67,
      d: 68,
      e: 69,
      f: 70,
      g: 71,
      h: 72,
      i: 73,
      j: 74,
      k: 75,
      l: 76,
      m: 77,
      n: 78,
      o: 79,
      p: 80,
      q: 81,
      r: 82,
      s: 83,
      t: 84,
      u: 85,
      v: 86,
      w: 87,
      x: 88,
      y: 89,
      z: 90,
      metaleft: 91,
      metaright: 92,
      select: 93,
      numpad0: 96,
      numpad1: 97,
      numpad2: 98,
      numpad3: 99,
      numpad4: 100,
      numpad5: 101,
      numpad6: 102,
      numpad7: 103,
      numpad8: 104,
      numpad9: 105,
      numpadmultiply: 106,
      numpadadd: 107,
      numpadsubtract: 109,
      numpaddecimal: 110,
      numpaddivide: 111,
      f1: 112,
      f2: 113,
      f3: 114,
      f4: 115,
      f5: 116,
      f6: 117,
      f7: 118,
      f8: 119,
      f9: 120,
      f10: 121,
      f11: 122,
      f12: 123,
      numlock: 144,
      scrolllock: 145,
      semicolon: 186,
      equalsign: 187,
      comma: 188,
      minus: 189,
      period: 190,
      slash: 191,
      backquote: 192,
      bracketleft: 219,
      backslash: 220,
      braketright: 221,
      quote: 222
    }

    Object.keys(obj).forEach((name) => {
      this.InputManager.mapInput([name])
    })

    this.InputManager.on('InputManager.keyUp', this.onKeyUp.bind(this))

    let inputRow = new PIXI.Container()
    let prompt = new PIXI.Text('>', { fill: 0xFFFFFF, fontSize: 25 })
    this.promptText = new PIXI.Text('', { fill: 0xFFFFFF, fontSize: 25 })
    // let
    prompt.x = 5
    this.promptText.x = prompt.x + prompt.width + 10

    inputRow.addChild(prompt)
    inputRow.addChild(this.promptText)

    this.addChild(inputRow)
    this.addChild(graphics)
  }

  /**
   * React to the keyup event for when typing in the active
   * Scene.
   *
   * @param event
   */
  onKeyUp (event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyUp events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See InputManager.mapInput
     * for more information.
     */
    this._updateDialogPromptText(event.key)
  }

  /**
   * Update the dialog after typing a character.
   *
   * @param char
   * @private
   */
  _updateDialogPromptText (char) {
    if (char === 'Enter') {
      let command = this.promptText.text.toLowerCase().trim()
      this.executeCommand(command)
    } else {
      this.promptText.text += char
    }
  }

  /**
   * Execute a typed command.
   *
   * @param command
   */
  executeCommand (command) {
    if (this.DebugManager.haveCommand(command)) {
      console.log('have command')
    } else {
      console.log('command not found')
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = DebugDialog
}