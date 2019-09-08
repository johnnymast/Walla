require('pixi-sound')

class AssetManager extends PIXI.utils.EventEmitter {

  /**
   * @classdesc AssetManager
   * @exports  core/managers/AssetManager
   * @class
   */
  constructor () {
    super()
    PIXI.utils.EventEmitter.call(this)
    PIXI.loader.once('complete', this._preloadready, this)
    PIXI.loader.on('progress', this._preloadProgress, this)
  }

  /**
   * This function allows you to preload a set of assets at once.
   *
   * @example
   *
   * // Load the core_ui spritesheet.
   * this.ge.get('AssetManager').loadManifest([
   *   {name: 'core_ui', type: 'spritesheet', src: 'assets/core/ui/core_ui.json'},
   * });
   *
   * @param {array} manifest - An array with assets to load
   * @returns {AssetManager}
   */
  loadManifest (manifest) {
    for (let asset of manifest) {
      PIXI.loader.add(asset.name, asset.src)
    }
    PIXI.loader.load()
    return this
  }

  /**
   * Progress callback for the AssetManager. This internal function will emit
   * the progress event for the AssetManager.
   *
   * @param {Loader} loader - The loader the progress is advancing on.
   * @param {Resource} resource - The resource progressing in downloading.
   * @private
   */
  _preloadProgress (loader, resource) {
    this.emit('progress', loader, resource)
  }

  /**
   * Preloading of resources has finished. This internal function
   * will emit the complete event for the AssetManager.
   *
   * @param {Loader} loader - The loader instance
   * @param {array} resources - The loaded resources
   * @private
   */
  _preloadready (loader, resources) {
    this.emit('complete', loader, resources)
  }
}

module.exports = AssetManager