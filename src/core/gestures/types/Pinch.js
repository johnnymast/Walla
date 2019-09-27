/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */

const Transform = require('core/Transform')
const Vector2d = require('core/math/vector2d')

/**
 *
 * @param {object} object - the object to pinch on
 * @param args [args = null] - optional arguments (min and max zoom)
 * @constructor
 */
let Pinch = function (object, args = null) {
  this._object = object
  this._enabled = false
  this._minzoom = 0
  this._maxzoom = 10
  this._delay = 12

  if (args instanceof Array) {
    this._minzoom = args[0]
    this._maxzoom = args[1]
  }

  this.reset()

  this._object
    .on('touchstart', this.start.bind(this))
    .on('touchend', this.end.bind(this))
    .on('touchendoutside', this.end.bind(this))
}

Pinch.prototype = {
  constructor: Pinch,
  get enabled () {
    return this._enabled
  },
  set enabled (value) {
    this._enabled = value
    this._object.interactive = value
  },

  /**
   * Start handling the first touch.
   *
   * @param {PIXI.interaction.InteractionEvent} e - the event
   */
  start: function (e) {
    if (this._enabled === true) {
      this.reset()
      this._object.on('touchmove', this.move.bind(this))
    }
  },

  /**
   * Handle touch movement
   *
   * @param {PIXI.interaction.InteractionEvent} e - the event
   */
  move: function (e) {
    if (this._enabled === true) {

      let touches = e.data.originalEvent.targetTouches

      /**
       * We need 2 touches.
       */
      if (!touches || touches.length < 2) {
        return
      }

      let finger1 = new Vector2d(touches[0].clientX, touches[0].clientY)
      let finger2 = new Vector2d(touches[1].clientX, touches[1].clientY)
      let center = new Vector2d(finger1.x + (finger2.x - finger1.x) / 2, finger1.y + (finger2.y - finger1.y) / 2)

      let distance = Math.sqrt(Math.pow(finger2.x - finger1.x, 2) + Math.pow(finger2.y - finger1.y, 2))

      if (!this._object._pinch) {
        this._object._pinch = {
          date: new Date(),
          distance: distance,
          backup: {
            position: new PIXI.Point(this._object.x, this._object.y),
            scale: { x: this._object.scale.x, y: this._object.scale.y },
          }
        }

        let event = {
          center: center,
          target: this._object
        }

        this._object.emit('pinchstart', event)
        return
      }

      let now = new Date()
      let interval = now - this._object._pinch.date
      if (interval < this._delay) {
        return
      }

      let scale = distance / this._object._pinch.distance

      if (scale < this._minzoom) {
        scale = this._minzoom
      }

      if (scale > this._maxzoom) {
        scale = this._maxzoom
      }

      let transform = this.translate(scale, center.x, center.y)
      let position = center.clone().subtract(transform)

      let event = {
        center: center,
        distance: distance,
        scale: scale,
        transform: transform,
        position: position,
        target: this._object,
        data: e.data,
      }

      this._object.emit('pinchmove', event)

    }
  },

  /**
   * Handle touchend and touchendoutside.
   *
   * @param {PIXI.interaction.InteractionEvent} e - the event
   */
  end: function (e) {
    if (this._enabled === true) {

      if (typeof this._object._pinch !== 'undefined') {
        let event = {
          target: this._object,
          backup: this._object._pinch.backup,
        }

        this._object.emit('pinchend', event)
      }

      this._object.removeListener('touchmove', this.move)
      this.reset()
    }
  },

  /**
   * Translate the x and y based on the given scale.
   *
   * @param {number} scale - the scale factor
   * @param {number} x - the x position
   * @param {number} y - the y position
   * @returns {Vector2d}
   */
  translate (scale = 0, x = 0, y = 0) {
    let result = this._transform.scale(scale).translate(x, y)
    return new Vector2d(result.x, result.y)
  },

  /**
   * Reset to default.
   */
  reset: function () {
    this._transform = new Transform()

    if (this._object._pinch) {
      delete this._object._pinch
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = Pinch
}