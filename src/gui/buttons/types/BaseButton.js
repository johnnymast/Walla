const Button = require('../BaseButton')

define(['pixi', 'underscore', 'core/GameObject'], function (pixi, _, GameObject) {
  let BaseButton = function (options) {

    this.textStyle = new pixi.TextStyle({
      fontFamily: 'Arial',
      fontSize: 16,
      fill: ['#000000'], // gradient
    })

    this.options = {
      text: '',
      x: 0,
      y: 0,
      width: 300,
      height: 100,
      state: {
        default: {
          textstyle: this.textStyle,
          bordercolor: 0xd0d3d8,
          bordersize: 2,
          borderopacity: 1,
          fillcolor: 0xdbd6d6,
          fillopacity: 1,
          radius: 15,
          text: '',
        },
        hover: {
          textstyle: this.textStyle,
          bordercolor: 0xabaeb2,
          bordersize: 2,
          borderopacity: 1,
          fillcolor: 0x9e9999, // 0xFF00BB,
          fillopacity: 1,
          radius: 20,
          text: '',
        },
        clicked: {
          textstyle: this.textStyle,
          bordercolor: 0xFF00FF,
          bordersize: 2,
          borderopacity: 1,
          fillcolor: 0x777575,
          fillopacity: 1,
          radius: 20,
          text: '',
        }
      },
    }

    this.options = extend2(true, this.options, options)
    this.options.state.default.text = options.text

    Button.call(this, this.options)

    this.states = {
      default: null,
      hover: null,
      clicked: null,
    }
    this.init()
  }

  extend(BaseButton, Button)

  BaseButton.prototype.init = function () {

    let options = this.options
    let state_default = new PIXI.Graphics()
    let state_hover = new PIXI.Graphics()
    let state_clicked = new PIXI.Graphics()

    state_default.lineStyle(options.state.default.bordersize, options.state.default.bordercolor, options.state.default.borderopacity)
    state_default.beginFill(options.state.default.fillcolor, options.state.default.fillopacity)
    state_default.drawRoundedRect(options.x, options.y, options.width, options.height, options.state.default.radius)
    state_default.endFill()

    if (options.state.hover) {
      state_hover.lineStyle(options.state.hover.bordersize, options.state.hover.bordercolor, options.state.hover.borderopacity)
      state_hover.beginFill(options.state.hover.fillcolor, options.state.hover.fillopacity)
      state_hover.drawRoundedRect(options.x, options.y, options.width, options.height, options.state.default.radius)
      state_hover.endFill()
    }

    if (options.state.clicked) {
      state_clicked.lineStyle(options.state.clicked.bordersize, options.state.clicked.bordercolor, options.state.clicked.borderopacity)
      state_clicked.beginFill(options.state.clicked.fillcolor, options.state.clicked.fillopacity)
      state_clicked.drawRoundedRect(options.x, options.y, options.width, options.height, options.state.clicked.radius)
      state_clicked.endFill()
    }

    this.textLabel = new pixi.Text(this.options.text, options.state.default.textstyle)

    state_default.visible = true
    state_clicked.visible = false
    state_hover.visible = false

    this.states.default = state_default
    this.states.hover = state_hover
    this.states.clicked = state_clicked

    this.addChild(this.states.default)
    this.addChild(this.states.hover)
    this.addChild(this.states.clicked)
    this.addChild(this.textLabel);

    this.textLabel.x = this.width /2 - this.textLabel.width /2
    this.textLabel.y = this.height /2 - this.textLabel.height /2
  }

  BaseButton.prototype.setText = function (text) {
    this.options.text = text
    this.textLabel.text = this.options.text

    this.textLabel.x = this.width /2 - this.textLabel.width /2
    this.textLabel.y = this.height /2 - this.textLabel.height /2
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the button is no longer hovered.
   *
   * @param {event} event - The event object
   */
  Button.prototype._onPointerOut = function (event) {
    this.states.default.visible = true
    this.states.hover.visible = false
    this.states.clicked.visible = false

    if (typeof this.options.state.default.text !== 'undefined' && this.options.state.default.text.length > 0) {
      if (typeof this.options.state.default.textstyle !== 'undefined') {
        this.textLabel.style = this.options.state.default.textstyle
      }
      this.setText(this.options.state.default.text)
      this.onRestore()
    }
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the button is hovered.
   *
   * @param {event} event - The event object
   */
  Button.prototype._onPointerOver = function (event) {
    this.states.default.visible = false
    this.states.hover.visible = true
    this.states.clicked.visible = false

    if (typeof this.options.state.hover.text !== 'undefined' && this.options.state.hover.text.length > 0) {
      if (typeof this.options.state.hover.textstyle !== 'undefined') {
        this.textLabel.style = this.options.state.hover.textstyle
      }
      this.setText(this.options.state.hover.text)
      this.onHover()
    }
  }


  /**
   * You can overwrite this function if you wish
   * to handle if the button clicke is released.
   *
   * @param {event} event - The event object
   */
  BaseButton.prototype._onPointerUp = function (event) {
    this.states.default.visible = true
    this.states.hover.visible = false
    this.states.clicked.visible = false

    if (typeof this.options.state.default.text !== 'undefined' && this.options.state.default.text.length > 0) {
      if (typeof this.options.state.default.textstyle !== 'undefined') {
        this.textLabel.style = this.options.state.default.textstyle
      }
      this.setText(this.options.state.default.text)
      this.onRestore()
    }
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the button is clicked.
   *
   * @param {event} event - The event object
   */
  BaseButton.prototype._onPointerDown = function (event) {
    this.states.default.visible = false
    this.states.hover.visible = false
    this.states.clicked.visible = true

    if (typeof this.options.state.clicked.text !== 'undefined' && this.options.state.clicked.text.length > 0) {
      if (typeof this.options.state.clicked.textstyle !== 'undefined') {
        this.textLabel.style = this.options.state.clicked.textstyle
      }
      this.setText(this.options.state.clicked.text)
      this.onClick()
    }
  }

  return BaseButton
})
