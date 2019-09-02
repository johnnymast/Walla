/**
 * SceneManager
 * @namespace Core Managers
 */
define(['pixi', 'core/GameEngine'], function (GameEngine) {

  /**
   * @classdesc ResizeManager
   * @exports  core/managers/ResizeManager
   * @class
   */
  let ResizeManager = function (application, options) {

    this.application = application

    this.resolution = window.devicePixelRatio
    this.ratio = window.devicePixelRatio / this.resolution

    this.setupListeners()
    this.onResize()
  }

  /**
   * Start the resize event listener.
   */
  ResizeManager.prototype.setupListeners = function () {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  /**
   * Callback for the resize event.
   *
   * @param {event} e - The passed event.
   */
  ResizeManager.prototype.onResize = function (e) {
    this.resize()
  }

  /**
   * Actually resize the game
   */
  ResizeManager.prototype.resize = function () {
    this.application.renderer.resize(window.innerWidth * this.ratio | 0, window.innerHeight * this.ratio | 0)
  }

  return ResizeManager
})