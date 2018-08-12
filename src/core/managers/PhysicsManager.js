const Vector2d = require('core/math/Vector2d')

/**
 * PhysicsManager
 * @namespace Core Managers
 */
define(['pixi', 'matter-js', 'core/GameObject'], function (PIXI, Matter, GameObject) {

  /**
   * @classdesc PhysicsManager
   * @exports  core/managers/PhysicsManager
   * @class
   */
  let PhysicsManager = function (options) {
    GameObject.call(this, options)

    const canvas = document.getElementById('canvas')

    this.engine = Matter.Engine.create()
    this.world = this.engine.world

    this.render = Matter.Render.create({
      element: document.body,
      canvas: canvas,
      engine: this.engine,
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
    var mouse = Matter.Mouse.create(this.render.canvas),
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

  PhysicsManager.prototype.getEventHandler = function () {
    return Matter.Events
  }

  PhysicsManager.prototype.getEngine = function () {
    return this.engine
  }

  PhysicsManager.prototype.getWorld = function () {
    return this.world
  }

  PhysicsManager.prototype.add = function (body) {
    Matter.World.add(this.world, body)
  }

  PhysicsManager.prototype.remove = function (body) {
    Matter.World.remove(this.world, body)
  }

  PhysicsManager.prototype.PIXIToMatter = function (x, y, width, height) {
    return {
      x: x + (width * 0.5),
      y: y + (height * 0.5),
    }
  }

  PhysicsManager.prototype.setVelocity = function (body, options) {
    return Matter.Body.setVelocity(body, options)
  }

  PhysicsManager.prototype.setAngularVelocity = function (body, velocity) {
    return Matter.Body.setAngularVelocity(body, velocity)
  }

  PhysicsManager.prototype.applyForce = function (body, x, y) {
    return Matter.Body.applyForce(body, new Vector2d(body.position.x, body.position.y), new Vector2d(0, -0.5))
  }

  PhysicsManager.prototype.setPosition = function (body, x, y) {
    return Matter.Body.setPosition(body, new Vector2d(x, y))
  }

  PhysicsManager.prototype.rectangle = function (x, y, width, height, options = null) {
    return Matter.Bodies.rectangle(x, y, width, height, options)
  }

  PhysicsManager.prototype.circle = function (x, y, radius, options = null) {
    return Matter.Bodies.circle(x, y, radius, options)
  }

  PhysicsManager.prototype.update = function (delta) {
    return Matter.Engine.update(this.engine)
  }

  PhysicsManager.prototype.run = function () {
    return Matter.Render.run(this.render)
  }

  return PhysicsManager
})
