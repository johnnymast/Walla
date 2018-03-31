define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  var MenuItem = function (options) {
    GameObject.call(this, options)
  }

  extend(MenuItem, GameObject)

  return MenuItem
});