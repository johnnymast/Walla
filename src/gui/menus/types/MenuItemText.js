define(['pixi', 'gui/menus/MenuItem'], function (pixi,  MenuItem) {

  /**
   * @classdesc MenuItemText module
   * @exports  gui/menu/MenuItemText
   * @class
   * @param {string} text - Text for the menu item
   * @param {mixed} [options] - Options to pass to GameObject
   * @param {callback} callback - Callback for when the item has been clicked
   */
  var MenuItemText = function (text,  callback, options) {
    MenuItem.call(this, callback, options)

    var style = new pixi.TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff00'],
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440
    })

    this.richText = new pixi.Text(text, style)
    this.addChild(this.richText);
  }

  extend(MenuItemText, MenuItem)

  /**
   * Set the text for the menu item.
   * @param {string} text - Text for the menu item.
   */
  MenuItemText.prototype.setText = function (text) {
    this.richText.setText(text)
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
  MenuItemText.prototype.onPointerOut = function(event) {
    /**
     * You can overwrite this function if you wish
     * to handle if the mouse is leaving the menu option.
     */
    this.richText.style.fontSize = this.richText.style.fontSize - 2
  }

  /**
   * The default behavior is to increase the fontsize by 2 pixels
   * when the mouse pointer is hovering the menu item. You
   * can overwrite this if you extend this class with your own
   * class and overwrite the onPointerOver method.
   *
   * @override
   * @param {event} event - The event object
   */
  MenuItemText.prototype.onPointerOver = function(event) {
    /**
     * You can overwrite this function if you wish
     * to handle if mouse is hovering the menu item.
     */
    this.richText.style.fontSize = this.richText.style.fontSize + 2
  }

  return MenuItemText
});