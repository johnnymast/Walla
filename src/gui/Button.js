define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  var Button = function (texture) {
    GameObject.call(this, texture)
  }

  extend(Button, GameObject)

  return Button
})
