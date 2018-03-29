require('pixi-sound')

define(['pixi', 'core/GameEngine'], function (pixi) {

  var AssetManager = function () {
    PIXI.loaders.Loader.call(this)
  }

  extend(AssetManager, PIXI.loaders.Loader)

  AssetManager.prototype.loadManifest = function (manifest) {
    for (let asset of manifest) {
      this.add(asset.name, asset.src)
    }
    this.load()
    return this
  }

  return AssetManager
})
