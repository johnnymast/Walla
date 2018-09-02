/**
 * SceneManager
 * @namespace Core Managers
 */
define(['pixi', 'core/GameEngine'], function (GameEngine) {
  let ResizeManager = function (application, options) {

    this.autoFullScreen = options.autoFullScreen || true
    this.application = application

    this.setupListeners()
  }

  ResizeManager.prototype.setupListeners = function () {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  ResizeManager.prototype.onResize = function (e) {
    console.log('resize', e)
    this.resizeStage()
  }

  ResizeManager.prototype.resizeStage = function () {
    if (this.autoFullScreen === true) {
      let innerWidth = window.innerWidth
      let innerHeight = window.innerHeight
      let renderer = this.application.renderer;
      let screen = new PIXI.Rectangle(0, 0, innerWidth, innerHeight);
      let stage = this.application.stage

      // this.application.renderer.resize(innerWidth, innerHeight)

      stage.scale.set(renderer.screen.width/screen.width, renderer.screen.height/screen.height);

      let ratio = innerWidth / innerHeight;

      if (innerWidth / innerHeight >= ratio) {
        var w = window.innerHeight * ratio;
        var h = window.innerHeight;
      } else {
        var w = window.innerWidth;
        var h = window.innerWidth / ratio;
      }
      renderer.view.style.width = w + 'px';
      renderer.view.style.height = h + 'px';
    }
  }

  return ResizeManager
})