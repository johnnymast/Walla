define(['pixi', 'core/GameObject'], function (PIXI, GameObject) {
  /**
   * @classdesc Scene
   * @exports  core/Scene
   * @class
   */
  let Scene = function (options) {
    GameObject.call(this, options)

    this.childClass = Object.getPrototypeOf(this).constructor.name

    if (typeof this.update === 'undefined') {
      console.warn('Please add the update method to ' + this.childClass)
    }

    this.cursor_sprite = new PIXI.Sprite()
    this.cursor_sprite.interactive = false
    this.cursor_sprite.buttonMode = false
    this.cursor_sprite.cursor = 'none'
    this.cursor_sprite.anchor.set(0.5)

    this.on('pointerover', function () {
      this.cursor_sprite.visible = true
    }.bind(this))

    this.on('pointerout', function () {
      this.cursor_sprite.visible = false
    }.bind(this))

    this.on('pointermove', function (event) {
      this.cursor_sprite.position = event.data.global
    }.bind(this))

    /**
     *
     * @type {{}}
     */
    this.resources = {}

    this.fullscreen = {
      available: false,
      cancel: '',
      keyboard: false,
      request: '',
      check: '',
    }

    this._detectFullScreenSupport()

    /**
     *
     * @type {boolean}
     * @default false
     */
    this.paused = true

    this.app.ticker.maxFPS = 60
    this.app.ticker.add((delta) => {
      //if (this.app.ticker.FPS == 60) {
        this._update(delta)
      //}
    })

    this.physicsTicker = new PIXI.ticker.Ticker()
    this.physicsTicker.speed = PIXI.ticker.shared.speed + 0.5
    this.physicsTicker.autoStart = true
    this.physicsTicker.add((delta) => {
      this._fixedupdate(delta)
    })
  }

  extend(Scene, GameObject)

  /**
   * You can call this function to see if fullscreen is available
   * on this device.
   *
   * @returns {boolean}
   */
  Scene.prototype.isFullScreenAvailable = function () {
    return this.fullscreen.available
  }

  /**
   * Check to see if the device is in fullscreen mode.
   *
   * @returns {boolean}
   */
  Scene.prototype.isFullScreen = function () {
    if (this.isFullScreenAvailable() === true) {
      if (typeof document[this.fullscreen.check] !== 'undefined') {
        return document[this.fullscreen.check]
      }
    }
    return false
  }

  /**
   * Toggle fullscreen mode.
   *
   * @returns {*}
   */
  Scene.prototype.enterFullScreen = function () {
    if (this.isFullScreenAvailable() === true) {
      if (typeof this.app.view[this.fullscreen.request] !== 'undefined') {
        this.app.view[this.fullscreen.request]()
      }
    }
  }

  /**
   * Exit from fullscreen if device is in fullscreen mode.
   *
   * @returns {*}
   */
  Scene.prototype.exitFullScreen = function () {
    if (this.isFullScreenAvailable() === true && this.isFullScreen() === true) {
      if (typeof document[this.fullscreen.cancel] !== 'undefined') {
        document[this.fullscreen.cancel]()
      }
    }
  }

  /**
   * Hide the cursor on the current Scene.
   */
  Scene.prototype.hideCursor = function () {
    this.cursor = 'none'
  }

  /**
   * Define a new cursor.
   *
   * @param {string} name
   * @param {string} texture_name
   */
  Scene.prototype.addCursor = function (name = '', texture_name = '') {
    this.InteractionManager.cursorStyles[name] = () => {
      this.cursor_sprite.texture = PIXI.Texture.fromFrame(texture_name)
    }
  }

  /**
   * Set a cursor.
   *
   * @param {string} name - The name of the cursor
   */
  Scene.prototype.setCursor = function (name = '') {

    if (this.cursor_sprite.parent) {
      this.removeChild(this.cursor_sprite)
    }

    this.hideCursor()

    this.addChild(this.cursor_sprite)
    this.cursor = name
  }

  /**
   * If you wish to preload assets in your scene you can
   * overwrite this function.
   */
  Scene.prototype.preload = function () {
    /**
     * This function will be called during switching of Scenes.
     * You can implement this method to act on this event.
     */
  }

  /**
   * Callback for the onPause event. You can overwrite this your self
   * to receive the onPause call.
   */
  Scene.prototype.onPause = function () {
    /**
     * This function will be called when the Scene is paused.You can overwrite this in
     * your Scene to act on this event.
     */
  }

  /**
   * Callback for the onStart event. You can overwrite this your self
   * to receive the onStart call.
   */
  Scene.prototype.onStart = function () {
    /**
     * This function will be called when the scene is started. You can overwrite this in
     * your Scene to act on this event.
     */
  }

  /**
   * Callback for the onResume event. You can overwrite this your self
   * to receive the onResume call.
   */
  Scene.prototype.onResume = function () {
    /**
     * This function will be called when the scene is unpauzed. You can overwrite this in
     * your Scene to act on this event.
     */
  }

  /**
   * Callback for the onSwitchedAway event. You can overwrite this your self
   * to receive the onResume call.
   */
  Scene.prototype.onSwitchedAway = function () {
    /**
     * This function will be called when the scene is been switched away from. You can overwrite this in
     * your Scene to act on this event.
     */
  }

  /**
   * Start the scene
   */
  Scene.prototype.start = function () {
    this.paused = false
    this.onStart()
  }

  /**
   * The scene has been switched off.
   */
  Scene.prototype.switchedAway = function () {
    this.onSwitchedAway()
  }

  /**
   * Pause the scene
   */
  Scene.prototype.pause = function () {
    this.paused = true
    this.onPause()
  }

  /**
   * Resume a paused scene.
   */
  Scene.prototype.resume = function () {
    this.paused = false
    this.onResume()
  }

  /**
   * Ask if the scene is paused.
   *
   * @returns {boolean}
   */
  Scene.prototype.isPaused = function () {
    return this.paused
  }

  /**
   * Check if whe have fullscreen support available.
   * To be honest i have to give credit this function is taken
   * from phaser sourcecode.
   *
   * Source:
   * https://github.com/photonstorm/phaser/blob/747f09af86f11accd922210bd5b35c236bda5741/src/device/Fullscreen.js
   *
   *
   * @author       Richard Davey <rich@photonstorm.com>
   * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
   * @private
   */
  Scene.prototype._detectFullScreenSupport = function () {
    let fs = [
      'requestFullscreen',
      'requestFullScreen',
      'webkitRequestFullscreen',
      'webkitRequestFullScreen',
      'msRequestFullscreen',
      'msRequestFullScreen',
      'mozRequestFullScreen',
      'mozRequestFullscreen'
    ]

    let element = document.createElement('div')

    for (let i = 0; i < fs.length; i++) {
      if (element[fs[i]]) {
        this.fullscreen.available = true
        this.fullscreen.request = fs[i]
        break
      }
    }

    let cfs = [
      'cancelFullScreen',
      'exitFullscreen',
      'webkitCancelFullScreen',
      'webkitExitFullscreen',
      'msCancelFullScreen',
      'msExitFullscreen',
      'mozCancelFullScreen',
      'mozExitFullscreen'
    ]

    if (this.fullscreen.available) {
      for (let i = 0; i < cfs.length; i++) {
        if (typeof document[cfs[i]] == 'function') {
          this.fullscreen.cancel = cfs[i]
          break
        }
      }
    }

    let cff = [
      'fullscreen',
      'webkitIsFullScreen',
      'mozFullScreen',
    ]

    for (let i = 0; i < cff.length; i++) {
      if (typeof document[cff[i]] == 'boolean') {
        this.fullscreen.check = cff[i]
        break
      }
    }

    //  Keyboard Input?
    if (window['Element'] && Element['ALLOW_KEYBOARD_INPUT']) {
      this.fullscreen.keyboard = true
    }
  }

  /**
   * The update function for physics. You can overwrite this function
   * in your own level to update physics for your your game.
   *
   * @param {number} delta - the delta since the last tick
   */
  Scene.prototype.fixedUpdate = function (delta) {
    // Overwrite this function
  }

  /**
   * Internal fixedupdate function. This is called per tick.
   * This function is specially for updating physics in the game engine
   * it runs 2x faster then the update function.
   *
   * @param {number} delta - the delta since the last tick
   * @private
   */
  Scene.prototype._fixedupdate = function (delta) {
    if (!this.isPaused()) {
      this.fixedUpdate(delta)
    }
  }

  /**
   * Internal update function. This is called per tick.
   *
   * @param {number} delta - the delta since the last tick
   * @private
   */
  Scene.prototype._update = function (delta) {

    if (!this.isPaused()) {
      let plugins = this.SceneManager.getPlugins()

      for (let key in plugins) {
        if (plugins[key].runsPre()) {
          plugins[key].update(delta)
        }
      }

      this.update(delta)

      for (let key in plugins) {
        if (plugins[key].runsPost()) {
          plugins[key].update(delta)
        }
      }
    }
  }

  return Scene
})
