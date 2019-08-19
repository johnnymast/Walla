const Button = require('../BaseButton')

define(['pixi', 'underscore', 'core/GameObject'], function (PIXI, _, GameObject) {
  let ImageButton = function (options) {

    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 4,
      fill: ['#ffffff'], // gradient
    })

    this.options = {
      text: '',
      x: 0,
      y: 0,
      width: 180,
      height: 24,
      state: {
        default: {
          texture: 'panel_woodDetail.png',
          bordercolor: 0xd0d3d8,
          bordersize: 2,
          borderopacity: 1,
          fillcolor: 0xffffff,
          fillopacity: 1,
          radius: 15,
          text: '',
        },
        hover: {
          texture: 'panel_woodDetail.png',
          textstyle: this.textStyle,
          bordercolor: 0xabaeb2,
          bordersize: 2,
          borderopacity: 1,
          fillcolor: 0xffffff, // 0xFF00BB,
          fillopacity: 1,
          radius: 20,
          text: '',
        },
        clicked: {
          texture: 'panel_woodDetail.png',
          textstyle: this.textStyle,
          bordercolor: 0xFF00FF,
          bordersize: 2,
          borderopacity: 1,
          fillcolor: 0xffffff,
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

  extend(ImageButton, Button)

  /**
   * Set thew text for the button.
   *
   * @param {string} text - the text for the button
   */
  ImageButton.prototype.setText = function (text) {
    this.options.text = text
    this.textLabel.text = this.options.text

    this.textLabel.x = this.width / 2 - this.textLabel.width / 2
    this.textLabel.y = this.height / 2 - this.textLabel.height / 2
  }

  /**
   * Initialize the ImageButton objects.
   */
  ImageButton.prototype.init = function () {

    let options = this.options
    let state_default = new PIXI.Sprite(PIXI.Texture.fromImage(options.state.default.texture))
    let state_hover = new PIXI.Sprite(PIXI.Texture.fromImage(options.state.hover.texture))
    let state_clicked = new PIXI.Sprite(PIXI.Texture.fromImage(options.state.clicked.texture))

    state_default.width = this.options.width
    state_default.height = this.options.height

    state_hover.width = this.options.width
    state_hover.height = this.options.height

    state_clicked.width = this.options.width
    state_clicked.height = this.options.height

    this.textLabel = new PIXI.Text(this.options.text, options.state.default.textstyle)

    state_default.visible = true
    state_clicked.visible = false
    state_hover.visible = false

    this.states.default = state_default
    this.states.hover = state_hover
    this.states.clicked = state_clicked

    this.addChild(this.states.default)
    this.addChild(this.states.hover)
    this.addChild(this.states.clicked)
    this.addChild(this.textLabel)

    this.textLabel.x = this.width / 2 - this.textLabel.width / 2
    this.textLabel.y = this.height / 2 - this.textLabel.height / 2
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the button is no longer hovered.
   *
   * @param {event} event - the event object
   */
  ImageButton.prototype._onPointerOut = function (event) {
    this.states.default.visible = true
    this.states.hover.visible = false
    this.states.clicked.visible = false

    if (typeof this.options.state.default.text !== 'undefined') {
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
   * @param {event} event - the event object
   */
  ImageButton.prototype._onPointerOver = function (event) {
    this.states.default.visible = false
    this.states.hover.visible = true
    this.states.clicked.visible = false

    if (typeof this.options.state.hover.text !== 'undefined') {
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
  ImageButton.prototype._onPointerUp = function (event) {
    this.states.default.visible = true
    this.states.hover.visible = false
    this.states.clicked.visible = false

    if (typeof this.options.state.default.text !== 'undefined') {
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
   * @param {event} event - the event object
   */
  ImageButton.prototype._onPointerDown = function (event) {
    this.states.default.visible = false
    this.states.hover.visible = false
    this.states.clicked.visible = true

    if (typeof this.options.state.clicked.text !== 'undefined') {
      if (typeof this.options.state.clicked.textstyle !== 'undefined') {
        this.textLabel.style = this.options.state.clicked.textstyle
      }
      this.setText(this.options.state.clicked.text)
      this.onClick()
    }
  }

  return ImageButton
})
