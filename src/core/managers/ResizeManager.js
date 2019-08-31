/**
 * SceneManager
 * @namespace Core Managers
 */
define(['pixi', 'core/GameEngine'], function (GameEngine) {
  let ResizeManager = function (application, options) {

    this.application = application

    this.resolution = window.devicePixelRatio
    this.ratio = window.devicePixelRatio / this.resolution

    this.setupListeners()
    this.onResize()
  }

  ResizeManager.prototype.setupListeners = function () {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  ResizeManager.prototype.onResize = function (e) {
    this.resize()
  }

  ResizeManager.prototype.resize = function () {
    this.application.renderer.resize(window.innerWidth * this.ratio | 0, window.innerHeight * this.ratio | 0)
  }

  return ResizeManager
})