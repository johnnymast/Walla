/**
 * PhysicsManager
 * @namespace Core Managers
 */
define(['pixi', 'matter-js', 'core/GameObject', 'core/math/vector2d'], function (PIXI, Matter, GameObject, Vector2d) {
  /**
   * @classdesc PhysicsManager
   * @exports  plugins/matterjs/PhysicsManager
   * @class
   */
  let PhysicsManager = function (options) {
    GameObject.call(this, options)

    const canvas = document.getElementById('canvas')

    /**
     * @type {Matter.Engine}
     */
    this.engine = Matter.Engine.create()

    /**
     * @type {Matter.Engine}
     */
    this.world = this.engine.world

    /**
     * @type {Matter.Render}
     */
    this.render = Matter.Render.create({
      element: document.body,
      canvas: canvas,
      engine: this.engine,
      // controller: Matter.RenderPixi,
      options: {
        width: this.app.screen.width,
        height: this.app.screen.height,
        center: true,
        wireframes: true,
        wireframe: true,
        pixelRatio: window.devicePixelRatio,
        // showIds: true,
        showLabels: true,
        showAngleIndicator: true,
        showCollisions: true,
        showVelocity: true
      }
    })

    // add mouse control
    let mouse = Matter.Mouse.create(this.render.canvas),
      mouseConstraint = Matter.MouseConstraint.create(this.engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      })

    Matter.World.add(this.world, mouseConstraint)
  }

  extend(PhysicsManager, GameObject)

  /**
   * Return the Events object.
   *
   * @returns {Matter.Events}
   */
  PhysicsManager.prototype.getEventHandler = function () {
    return Matter.Events
  }

  /**
   * Return the engine object.
   *
   * @returns {Matter.Engine}
   */
  PhysicsManager.prototype.getEngine = function () {
    return this.engine
  }

  /**
   * Return the world object.
   *
   * @returns {Matter.World}
   */
  PhysicsManager.prototype.getWorld = function () {
    return this.world
  }

  /**
   * Add a new body.
   *
   * @param {Matter.Body} body - the body to add to the world.
   */
  PhysicsManager.prototype.add = function (body) {
    Matter.World.add(this.world, body)
  }

  PhysicsManager.prototype.remove = function (body) {
    Matter.World.remove(this.world, body)
  }

  /**
   * Translate a PIXI x/y to matter js coordinates.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @returns {{x: *, y: *}}
   */
  PhysicsManager.prototype.PIXIToMatter = function (x, y, width, height) {
    return {
      x: x + (width * 0.5),
      y: y + (height * 0.5)
    }
  }

  /**
   * Apply velocity on a given body.
   *
   * @param {Matter.Body} body - the body to apply velocity on
   * @param {object|null} [options=null] - optional arguments
   */
  PhysicsManager.prototype.setVelocity = function (body, options) {
    return Matter.Body.setVelocity(body, options)
  }

  /**
   * Sets the angular velocity of the body instantly. Position, angle, force etc. are unchanged.
   *
   * @param {Matter.Body} body - the body to apply velocity on
   * @param {number} [velocity=0] - the velocity value
   */
  PhysicsManager.prototype.setAngularVelocity = function (body, velocity = 0) {
    return Matter.Body.setAngularVelocity(body, velocity)
  }

  /**
   * Apply force to the body.
   *
   * @param {Matter.Body} body - the body to apply force on
   * @param {number} x - the force of the x position
   * @param {number} y - the force of the y position
   */
  PhysicsManager.prototype.applyForce = function (body, x, y) {
    return Matter.Body.applyForce(body, new Vector2d(body.position.x, body.position.y), new Vector2d(x, y))
  }

  /**
   * Set the position of the body.
   *
   * @param {Matter.Body} body - the body to set the position on
   * @param {number} x - x position for the body
   * @param {number} y - y position for the body
   */
  PhysicsManager.prototype.setPosition = function (body, x, y) {
    return Matter.Body.setPosition(body, new Vector2d(x, y))
  }

  /**
   * Create a rectangle body.
   *
   * @param {number} x - the x position
   * @param {number} y = the y position
   * @param {number} width - the width of the rectangle
   * @param {number} height - the height of the rectangle
   * @param {object} [options=null] - optional options for the circle body.
   * @returns {Matter.Body}
   */
  PhysicsManager.prototype.rectangle = function (x, y, width, height, options = null) {
    return Matter.Bodies.rectangle(x, y, width, height, options)
  }

  /**
   * Create a circle body.
   *
   * @param {number} x - the x position
   * @param {number} y = the y position
   * @param {number} radius - the radius of the circle
   * @param {object} [options=null] - optional options for the circle body.
   * @returns {Matter.Body}
   */
  PhysicsManager.prototype.circle = function (x, y, radius, options = null) {
    return Matter.Bodies.circle(x, y, radius, options)
  }

  /**
   * Update the physics engine.
   *
   * @param {number} delta - the time diffrence since last time tick.
   * @returns {Matter.Engine}
   */
  PhysicsManager.prototype.update = function (delta) {
    return Matter.Engine.update(this.engine)
  }

  /**
   * Run the Physics Engine
   */
  PhysicsManager.prototype.run = function () {
    return Matter.Render.run(this.render)
  }

  return PhysicsManager
})
