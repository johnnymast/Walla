define(['pixi', 'core/GameObject', 'core/gui/menu/MenuItem'], function (pixi, GameObject, MenuItem) {
  var MenuItemText = function (options) {
    Menu.call(this, options)
  }

  extend(MenuItemText, GameObject)

  return MenuItemText
}