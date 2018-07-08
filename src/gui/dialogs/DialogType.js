define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  let DialogType = function (options) {
    GameObject.call(this, options)
    this.options = []
  }

  extend(DialogType, GameObject)

  return DialogType
})
