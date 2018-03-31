define(['pixi', 'core/GameObject', 'gui/menu/MenuItem'], function (pixi, GameObject, MenuItem) {
  var MenuItemText = function (options) {
    MenuItem.call(this, options)
  }

  extend(MenuItemText, GameObject)

  return MenuItemText
});