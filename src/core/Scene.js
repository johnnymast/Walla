define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  var Scene = function (options) {
    GameObject.call(this, options)

    this.paused = false
    this.childClass = Object.getPrototypeOf(this).constructor.name
    
    if (typeof this.update === 'undefined') {
      console.warn('Please add the update method to ' + this.childClass)
    }

    this.resources = {}

    /**
     * Every Scene loaded by default untill onStart until switching to the Scene.
     */
    this.paused = true

    this.app.ticker = this.app.ticker
    this.app.ticker.add((delta) => {
      this._update(delta)
    })
  }

  extend(Scene, GameObject)

  Scene.prototype.preload = function () {
    /**
     * This function will be called during switching of Scenes.
     * You can implement this method to act on this event.
     */
  }

  Scene.prototype.onPause = function () {
    /**
     * This function will be called when the Scene is paused.You can overwrite this in
     * your Scene to act on this event.
     */
  }

  Scene.prototype.onStart = function () {
    /**
     * This function will be called when the scene is started. You can overwrite this in
     * your Scene to act on this event.
     */
  }

  Scene.prototype.onResume = function () {
    /**
     * This function will be called when the scene is unpauzed. You can overwrite this in
     * your Scene to act on this event.
     */
  }

  Scene.prototype.start = function () {
    this.paused = false
    this.onStart()
  }

  Scene.prototype.pause = function () {
    this.paused = true
    this.onPause()
  }

  Scene.prototype.resume = function () {
    this.paused = false
    this.onResume()
  }

  Scene.prototype.isPaused = function () {
    return this.paused
  }

  Scene.prototype._update = function (delta) {
    if (!this.isPaused()) {
      this.update(delta)
    }
  }

  return Scene
})
