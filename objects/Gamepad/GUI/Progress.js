const GameObject = require('core/GameObject')

class Progress extends GameObject {
  constructor (axl) {
    super()

    /**
     * Reference to the GamePad Axis.
     *
     * @type {Axis}
     */
    this.axl = axl

    /**
     * The axis index.
     *
     * @type {number}
     */
    this.index = this.axl.getIndex()

    /**
     * Component options.
     *
     * @type {{track_color: number, progress_color: number, width: number, height: number, value: number}}
     */
    this.options = {
      track_color: 0x202226,
      progress_color: 0xFF00FF,
      width: 200,
      height: 16,
      value: 0,
    }

    /**
     * Setup the component.
     */
    this.init()
  }

  /**
   * Initialize the graphics
   */
  init () {

    this.graphics = new PIXI.Graphics()
    this.render()
    this.addChild(this.graphics)
  }

  /**
   * Update the progress bar.
   */
  render () {
    this.graphics.clear()

    /**
     * Render track
     */
    this.graphics.beginFill(this.options.track_color, 1)
    this.graphics.drawRect(0, 0, this.options.width, this.options.height)
    this.graphics.endFill()

    /**
     * Render progress
     */
    this.graphics.beginFill(this.options.progress_color, 1)
    this.graphics.drawRect(this.width / 2, 0 , (this.options.width * this.axl.getValue()) /2, this.options.height)
    this.graphics.endFill()
  }

  /**
   * Update the progress bar.
   *
   * @param {number} delta - The time passed since last update
   */
  update (delta) {
    this.render()
  }
}

module.exports = Progress