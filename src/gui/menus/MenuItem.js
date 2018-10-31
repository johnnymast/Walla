define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  /**
   * @classdesc Abstract class representing a menu item.
   * @exports gui/menu/MenuItem
   * @class
   * @param {callback} callback - Callback for when the item has been clicked
   * @param {mixed} [options] - Options to pass to GameObject
   */
  let MenuItem = function (callback, options) {
    GameObject.call(this, options)

    this.buttonMode = true
    this.interactive = true 
    this.callback = callback

    this.on('pointerdown', this.onPointerDown.bind(this))
    this.on('pointerout', this.onPointerOut.bind(this))
    this.on('pointerover', this.onPointerOver.bind(this))
  }

  extend(MenuItem, GameObject)

  /**
   * Set the x and y properties of this menu item.
   * @param {number} x - Set the x position
   * @param {number} y - Set the y position
   */
  MenuItem.prototype.setPosition = function (x, y) {
    this.x = x
    this.y = y
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the menu item is clicked.
   *
   * @param {event} event - The event object
   */
  MenuItem.prototype.onPointerDown = function (event) {
    this.callback()
  }

  /**
   * You can overwrite this function if you wish
   * to handle if the menu item mouse cursor leaves the
   * item.
   *
   * @param {event} event - The event object
   */
  MenuItem.prototype.onPointerOut = function (event) {
    // Function body
  }
  /**
   * You can overwrite this function if you wish
   * to handle if the menu item is hovered.
   *
   * @param {event} event - The event object
   */
  MenuItem.prototype.onPointerOver = function (event) {
    // Function body
  }

  return MenuItem
})
