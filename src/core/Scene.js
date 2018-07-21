const gesture = require('PIXI-simple-gesture').default

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

    gesture.pinchable(this, true)

    this.on('panmove', e => {
      sprite.x += e.deltaX
      sprite.y += e.deltaY
    })

    this.on('panstart', () => {
      console.log('panstart')
    })

    this.on('panend', () => {
      console.log('panend')
    })

    this.on('pinchmove', e => {
      sprite.scale.x = Math.max(0.5, sprite.scale.x * e.scale)
      sprite.scale.y = Math.max(0.5, sprite.scale.y * e.scale)
    })

    this.on('pinchstart', () => {
      console.log('pinchstart')
    })

    this.on('pinchend', () => {
      console.log('pinchend')
    })

    this.on('simpletap', () => {
      console.log('simpletap')
    })


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

    /**
     *
     * @type {boolean}
     * @default false
     */
    this.paused = true

    this.app.ticker.add((delta) => {
      this._update(delta)
    })
  }

  extend(Scene, GameObject)

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
   * Callback for the onPause even. You can overwrite this your self
   * to receive the onPause call.
   */
  Scene.prototype.onPause = function () {
    /**
     * This function will be called when the Scene is paused.You can overwrite this in
     * your Scene to act on this event.
     */
  }

  /**
   * Callback for the onStart even. You can overwrite this your self
   * to receive the onStart call.
   */
  Scene.prototype.onStart = function () {
    /**
     * This function will be called when the scene is started. You can overwrite this in
     * your Scene to act on this event.
     */
  }

  /**
   * Callback for the onResume even. You can overwrite this your self
   * to receive the onResume call.
   */
  Scene.prototype.onResume = function () {
    /**
     * This function will be called when the scene is unpauzed. You can overwrite this in
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
   * Internal update function. This is called per tick.
   *
   * @param {number} delta - The delta since the last tick
   * @private
   */
  Scene.prototype._update = function (delta) {
    if (!this.isPaused()) {
      this.update(delta)
    }
  }

  return Scene
})
