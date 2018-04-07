define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  var MenuItem = function (options) {
    GameObject.call(this, options)

    this.buttonMode = true;
    this.interactive = true;

    this.on('mousedown', this.selected.bind(this))
  }

  extend(MenuItem, GameObject)

  MenuItem.prototype.setPosition = function(x, y) {
    this.x = x
    this.y = y
  }

  MenuItem.prototype.selected = function(event) {
    /**
     * You can overwrite this function if you wish
     * to handle if the menu item ss selected..
     */
  }

  return MenuItem
});