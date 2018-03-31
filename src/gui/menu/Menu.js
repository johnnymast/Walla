define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  var Menu = function (options) {
    GameObject.call(this, options)
  }

  extend(Menu, GameObject)

  return Menu
})