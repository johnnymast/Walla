require('pixi-sound')
require('pixi-tiledmap')

define(['core/GameEngine'], function () {

  let AssetManager = function () {
    PIXI.utils.EventEmitter.call(this)
    PIXI.loader.once('complete', this.preloadready, this)
    PIXI.loader.on('progress', this.preloadProgress, this)
  }

  extend(AssetManager, PIXI.utils.EventEmitter)

  AssetManager.prototype.loadManifest = function (manifest) {
    for (let asset of manifest) {
      PIXI.loader.add(asset.name, asset.src)
    }
    PIXI.loader.load()
    return this
  }

  AssetManager.prototype_preloadProgress = function (event) {
    this.emit('progress', event)
  }

  AssetManager.prototype.preloadready = function (loader, resources) {
    this.emit('complete', loader, resources)
  }

  return AssetManager
})
