define(['pixi', 'matter-js'], function (pixi, Matter) {
  var PhysicsManager = function (options) {
    const canvas = document.getElementById('canvas')

    this.engine = Matter.Engine.create()
    this.world = this.engine.world

    this.render = Matter.Render.create({
      element: document.body,
      canvas: canvas,
      engine: this.engine,
      options: {
        width: 800,
        height: 600,
        center: true,
        wireframes: true,
        wireframe: true,
        pixelRatio: window.devicePixelRatio,
        // showIds: true,
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

  PhysicsManager.prototype.PixiToMatter = function (x, y, width, height) {
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

  PhysicsManager.prototype.applyForce = function (body, x, y, width, height) {
    let coord = this.PixiToMatter(x, y, width, height)
    return Matter.Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: 0, y: -0.05})
  }

  PhysicsManager.prototype.setPosition = function (body, x, y, width, height) {
    let coord = this.PixiToMatter(x, y, width, height)
    return Matter.Body.setPosition(body, {x: coord.x, y: coord.y})
  }

  PhysicsManager.prototype.rectangle = function (x, y, width, height, options = null) {
    let coord = this.PixiToMatter(x, y, width, height)
    return Matter.Bodies.rectangle(coord.x, coord.y, width, height, options)
  }

  PhysicsManager.prototype.circle = function (x, y, radius, options = null) {
    //  let coord = this.PixiToMatter(x, y, width, height = width)
    console.log('circle options', options)
    return Matter.Bodies.circle(x, y, radius, options)
    // return Matter.Bodies.circle(coord.x, coord.y, width, options)
  }

  PhysicsManager.prototype.update = function (delta) {
    return Matter.Engine.update(this.engine)
  }

  PhysicsManager.prototype.run = function () {
    return Matter.Render.run(this.render)
  }

  return PhysicsManager
})
