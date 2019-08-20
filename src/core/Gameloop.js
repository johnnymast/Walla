class Gameloop {

  constructor () {

    /**
     * The maximum number of frames
     * to run the game loop at.
     *
     * @type {number}
     * @private
     */
    this._maxFps = 60

    /**
     * The timestamp of the last
     * tick.
     *
     * @type {number}
     * @private
     */
    this._lastTick = 0

    /**
     * The elapsed time since last
     * tick.
     *
     * @type {number}
     * @private
     */
    this._elapsed = performance.now()

    /**
     *
     * @type {boolean}
     * @private
     */
    this._paused = false

    /**
     * The update speed.
     *
     * @type {number}
     * @private
     */
    this._interval = 1000 / this._maxFps | 0

    /**
     * Container for all callbacks.
     *
     * @type {Array}
     * @private
     */
    this._callbacks = []

    /**
     * The animation fame handle. This can
     * be used to stop the animations.
     *
     * @type {number}
     * @private
     */
    this._handle = 0

    /**
     * The number of ticks
     * since the game loop started.
     *
     * @type {number}
     * @private
     */
    this._ticks = 0

    /**
     * The current FPS
     * @type {number}
     * @private
     */
    this._FPS = 0

    this._tick = () => {
      if (!this.isPaused()) {

        const now = performance.now() | 0 // Fix occasional drop-off frames
        const delta = now - this._lastTick

        if (delta >= this._interval) {
          this._ticks++
          this._elapsed = now - this._lastTick
          this._lastTick = now - (delta % this._interval)
          this._FPS = 1000 / this._elapsed

          this._callbacks.forEach((callback) => {
            callback(delta)
          })
        }
        this._handle = requestAnimationFrame(this._tick)
      }
    }

    this._tick.bind(this)
    this.update = {}
  }

  /**
   * Add a callback to the game loop. Every
   * time the maximum fps is reached these callbacks
   * will be executed.
   *
   * @param {function} callback - The callback.
   */
  add (callback) {
    if (callback instanceof Function) {
      this._callbacks.push(callback)
    }
  }

  /**
   * Remove the given callback.
   *
   * @param {function} callback - The callback.
   */
  remove (callback) {
    if (callback instanceof Function) {
      this._callbacks = this._callbacks.filter((item) => {
        return (item !== callback)
      })
    }
  }

  /**
   * Indicate if the game loop is paused
   * or not.
   *
   * @returns {boolean}
   */
  isPaused () {
    return this._paused
  }

  /**
   * Start the game loop.
   */
  start () {
    this._paused = false
    this._handle = requestAnimationFrame(this._tick)
  }

  /**
   * Stop the game loop.
   */
  stop () {
    this._paused = true
    cancelAnimationFrame(this._handle)
  }

  /**
   * Setter for the maximum allowed of frames the ticker
   * might run at.
   *
   * @param {number} fps - The maximum number of fps to run.
   */
  set maxFPS (fps) {
    this._maxFps = fps
    this._interval = 1000 / this._maxFps
  }

  /**
   * Return the configured maximum number
   * of frames.
   *
   * @returns {number}
   */
  get maxFPS () {
    return this._maxFps
  }

  /**
   * Return the number for active frames.
   *
   * @returns {number}
   */
  get FPS () {
    return this._FPS
  }
}

module.exports = Gameloop