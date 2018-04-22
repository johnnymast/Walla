define(['pixi', 'matter-js'], function (pixi, Matter) {
  var PhysicsManager = function (options) {
    const canvas = document.getElementById('canvas')

    this.engine = Matter.Engine.create({
      render: {
        element: document.body,
        canvas: canvas,
        options: {
          width: 800,
          height: 600,
          center: true,
          wireframes: true,
          wireframe: true,
        }
      }
    })

    this.world = this.engine.world
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

  PhysicsManager.prototype.PixiToMatter = function (x, y, width, height) {
    return {
      x: x + (width * 0.5),
      y: y + (height * 0.5),
    }
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

  PhysicsManager.prototype.circle = function (x, y, width, options = null) {
    let coord = this.PixiToMatter(x, y, width, height = width)
    return Matter.Bodies.circle(coord.x, coord.y, width, options)
  }

  PhysicsManager.prototype.update = function (delta) {
    return Matter.Engine.update(this.engine)
  }

  PhysicsManager.prototype.run = function () {
    return Matter.Engine.run(this.engine)
  }

  return PhysicsManager
})
