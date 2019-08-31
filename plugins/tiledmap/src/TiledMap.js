import TileLayer from './TileLayer'

export class TiledMap {
  constructor (data = null, path = '') {

    if (!data instanceof Object || !path.length)
      throw new Error('Error initializing TiledMap instance.')

    /**
     * Container for the layers
     *
     * @type {Array}
     * @private
     */
    this._layers = []

    /**
     * Container for the tilesets
     * @type {Array}
     * @private
     */
    this._tilesets = []

    /**
     *
     * @type {string}
     * @private
     */
    this._path = path

    /**
     *
     * @type {Object}
     * @private
     */
    this._data = data
  }

  /**
   * Parse the tiled map.
   */
  parse () {

    this._data.layers.forEach((layerData) => {

      let layer = new TileLayer(layerData)
      if (layer.encoding === 'base64') {
        layer.data = atob(layer.data)
        //
        if (typeof layerData.compression !== 'undefined') {
          if (layerData.compression === 'zlib' || layerData.compression === 'gzip') {
            var data = pako.inflate(layer.data)
            layer.data = []
            for (var i = 0; i < data.length; i += 4) {
              layer.data.push(data[i])
            }
          }
        }

        this._layers.push(layer)
      }
    })

    console.log(this.layers)
    // for (let layer of this._data.layers) {
    //   if (layer.encoding === 'base64') {
    //     layer.data = atob(layer.data)
    //
    //     if (typeof layer.compression !== 'undefined') {
    //       if (layer.compression == 'zlib' || layer.compression == 'gzip') {
    //         var data = pako.inflate(layer.data)
    //         layer.data = []
    //         for (var i = 0; i < data.length; i += 4) {
    //           layer.data.push(data[i])
    //         }
    //       }
    //     }
    //   }
    //   this.layers.push(layer)
    // }

  }

  /**
   *
   * @returns {string}
   */
  get path () {
    return this._path
  }

  /**
   *
   * @returns {Array}
   */
  get tilesets () {
    return this._tilesets
  }

  /**
   *
   * @returns {Array}
   */
  get layers () {
    return this._layers
  }
}