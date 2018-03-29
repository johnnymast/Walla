define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  var Menu = function (options) {
    Menu.call(this, options)
  }

  extend(Menu, GameObject)

  return Menu
}