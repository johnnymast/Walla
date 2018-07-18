const Buttons = require('gui/buttons')

define(['pixi', 'gui/menus/MenuItem'], function (pixi, MenuItem) {

  /**
   * @classdesc MenuItemImageButton module
   * @exports  gui/menu/MenuItemButton
   * @class
   * @param {string} text - Text for the menu item
   * @param {mixed} [options] - Options to pass to GameObject
   * @param {callback} callback - Callback for when the item has been clicked
   */
  let MenuItemImageButton = function (text, callback, options) {
    MenuItem.call(this, callback, options)

    this._options = {
      background_texture: 'panel_woodWear.png',
      text: text,
    }

    this.options = extend2(true, this._options, options)

    let style = new pixi.TextStyle({
      fontFamily: 'Arial',
      fontSize: 16,
      // fontStyle: 'italic',
      // fontWeight: 'bold',
      fill: ['#ffffff'],
    })

    let style_hover = style
    style_hover.fontSize += 2

    this.button = new Buttons.ImageButton({
      state: {
        default: {
          texture: this.options.background_texture,
          textstyle: style_hover
        },
        hover: {
          texture: this.options.background_texture,
          textstyle: style_hover
        },
        clicked: {
          texture: this.options.background_texture,
          textstyle: style_hover
        }
      }
    })

    this.button.setText(this.options.text)

    this.addChild(this.button)
  }

  extend(MenuItemImageButton, MenuItem)

  /**
   * Set the text for the menu item.
   * @param {string} text - Text for the menu item.
   */
  MenuItemImageButton.prototype.setText = function (text) {
    this.button.setText(text)
  }

  /**
   * The default behavior is to restore the fontsize
   * when the mouse pointer is leaving the menu item. You
   * can overwrite this if you extend this class with your own
   * class and overwrite the onPointerOut method.
   *
   * @override
   * @param {event} event - The event object
   */
  MenuItemImageButton.prototype.onPointerOut = function (event) {
    /**
     * You can overwrite this function if you wish
     * to handle if the mouse is leaving the menu option.
     */
    this.button._onPointerOut()
  }

  return MenuItemImageButton
})