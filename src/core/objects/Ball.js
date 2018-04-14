define(['pixi', 'core/sprites/PhysicsSprite'], function (pixi, PhysicsSprite) {
  var Ball = function (texture) {
    PhysicsSprite.call(this, texture)
  }

  extend(Ball, PhysicsSprite)

  Ball.prototype.setupBody = function () {
    var options = {
      friction: 0,
      restitution: 0.95,
      isStatic: true,
      isSleeping: true,
    }

    // var options = {
    //   isSleeping: false,
    //   isStatic: true,
    //   friction:0.0001,
    //   restitution: 0.7,
    //   density:0.001,
    //   frictionAir: 0.0001,
    //   inverseInertia: 0,
    //   //render: color,
    //   force: {//x:.005,
    //     //y:-.005
    //   }
    // };

    this.body = this.PhysicsManager.circle(this.x, this.y, this._width, options)
    this.PhysicsManager.add(this.body)
  }

  Ball.prototype.update = function () {
    var pos = this.body.position
    var angle = this.body.angle

    this.sprite.x = pos.x
    this.sprite.y = pos.y
  }

  return Ball
})
