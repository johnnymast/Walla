/**
 * ResizeManager
 * @namespace Core Managers
 */
class ResizeManager {

  /**
   * @classdesc Automatically resize the game.
   * @exports  core/managers/ResizeManager
   * @class
   */
  constructor (application) {
    this.application = application

    this.resolution = window.devicePixelRatio
    this.ratio = window.devicePixelRatio / this.resolution

    this.setupListeners()
    this.onResize()
  }

  /**
   * Start the resize event listener.
   */
  setupListeners () {
    window.addEventListener('resize', this.onResize.bind(this))
  }

  /**
   * Callback for the resize event.
   *
   * @param {event} e - The passed event.
   */
  onResize (e) {
    this.resize()
  }

  /**
   * Actually resize the game
   */
  resize () {
    this.application.renderer.resize(window.innerWidth * this.ratio | 0, window.innerHeight * this.ratio | 0)
  }
}

module.exports = ResizeManager