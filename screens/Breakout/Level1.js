// https://github.com/SonarSystems/Cocos2d-JS-v3-Tutorial-57---Adding-A-Menu-Image-Item/blob/master/src/app.js
define(['pixi', 'screens/Breakout/GameLevel', 'core/GameEngine', 'objects/Breakout/Brick', 'objects/Breakout/Pad', 'objects/Breakout/Ball'], function (pixi, GameLevel, GameEngine, Brick, Pad, Ball) {
  let Level1 = function (options) {
    GameLevel.call(this, {backgroundColor: 0x1099bb})

    this.startY = 50
    this.num_bricks = 11
    this.started = false
    this.setDisplayStats(true)
    this.didStart = false
    this.objects = []

    // FIXME: KeyPress doesnt work
    // FIXME: Physics for the blocks dont work
    // FIXME: Pedal not working correctly
    // FIXME: Add comments
  }

  extend(Level1, GameLevel)

  Level1.prototype.onStart = function () {
    GameLevel.prototype.onStart.call(this)

    /**
     * Lives tracking variable.
     *
     * @type {number}
     * @default 5
     */
    this.lives = 5

    /**
     * Score tracking variable.
     *
     * @type {number}
     * @default = 0
     */
    this.score = 0

    /**
     * Make the pad controllable with left and right arrows as well as
     * a and d for moving left and right. This is in addition to mouse
     * support.
     */
    this.InputManager.mapInput([this.InputManager.keys.ArrowLeft, 'a'], ['left'])
    this.InputManager.mapInput([this.InputManager.keys.ArrowRight, 'd'], ['right'])

    /**
     * Set the default scores and
     * lives.
     */
    this.setLives(this.lives)
    this.setScore(this.score)

    this.bricks = {
      'red': PIXI.Texture.fromFrame('element_red_rectangle.png'),
      'yellow': PIXI.Texture.fromFrame('element_yellow_rectangle.png'),
      'green': PIXI.Texture.fromFrame('element_green_rectangle.png'),
      'blue': PIXI.Texture.fromFrame('element_blue_rectangle.png'),
    }

    this.PhysicsManager.getWorld().gravity.y = 0.75
    let y = this.startY

    for (let key of Object.keys(this.bricks)) {
      let texture = this.bricks[key]
      for (let x = 45; x < (this.num_bricks * texture.width); x += texture.width) {
        let brick = new Brick(key, texture)
        brick.name = 'Brick' + this.objects.length + 1
        brick.setPosition(x + (texture.width * 0.5), y + (texture.height * 0.5))

        this.objects.push(brick)
        this.addChild(brick.sprite)
      }
      y += texture.height + 1
    }

    // Enable mouse interaction in this scene.
    this.interactive = true

    //
    // PIXI.sound.play('level1_music');
    // PIXI.sound.play('game_over');

    this.pad = new Pad(PIXI.Texture.fromFrame('paddleBlu.png'))
    this.pad.setPosition(this.app.screen.width/2, this.app.screen.height - 100)

    var tx = PIXI.Texture.fromFrame('ballBlue.png')
    this.ball = new Ball(tx); console.log('this.pad.height', this.pad.sprite.height)
    this.ball.setPosition(this.pad.body.position.x, this.pad.body.position.y - this.pad.sprite.height)

    //
    this.ball.onCollisionWith = (withOnbject) => {
      if (withOnbject.label == 'Pad') {
        let MAX_VELOCITY = 50
        var taxaAumentoVelocidade = .5
        console.log('hi with pad', withOnbject)
        if (this.ball.body.velocity.x > 0 && this.ball.body.velocity.y > 0) {
          console.log('case 1')
          this.PhysicsManager.setVelocity(this.ball.body, {
            x: this.ball.body.velocity.x + taxaAumentoVelocidade,
            y: this.ball.body.velocity.y + taxaAumentoVelocidade
          });
        } else if (this.ball.body.velocity.x < 0 && this.ball.body.velocity.y < 0) {
          console.log('case 2')
          this.PhysicsManager.setVelocity(this.ball.body, {
            x: this.ball.body.velocity.x - taxaAumentoVelocidade,
            y: this.ball.body.velocity.y - taxaAumentoVelocidade
          });
        } else if (this.ball.body.velocity.x > 0 && this.ball.body.velocity.y < 0) {
          console.log('case 3')
          this.PhysicsManager.setVelocity(this.ball.body, {
            x: this.ball.body.velocity.x + taxaAumentoVelocidade,
            y: this.ball.body.velocity.y - taxaAumentoVelocidade
          });
        } else {
          console.log('case 4')
          this.PhysicsManager.setVelocity(this.ball.body, {
            x: this.ball.body.velocity.x - taxaAumentoVelocidade,
            y: this.ball.body.velocity.y + taxaAumentoVelocidade
          });
        }
      }
      // this.PhysicsManager.setVelocity(this.ball.body, {
      //   x: Math.max(Math.min(this.ball.body.velocity.x, MAX_VELOCITY), -MAX_VELOCITY),
      //   y: Math.max(Math.min(this.ball.body.velocity.x, MAX_VELOCITY), -MAX_VELOCITY),
      // })
     // this.ball.fire()
    }

    this.objects.push(this.ball)
    this.objects.push(this.pad)

    this.addChild(this.ball.sprite)
    this.addChild(this.pad.sprite)

    this.PhysicsManager.run()
  }

  Level1.prototype.onMouseMove = function (event) {
    let coords = event.data.global
    if (coords.x + this.pad._width/2 > (this.app.screen.width - this.wall_inset)) {
      coords.x = this.app.screen.width - (this.pad._width/2) - this.wall_inset
    } else if (coords.x - this.pad._width/2 < this.pad._width/2) {
      coords.x = this.wall_inset + this.pad._width / 2
    }
    this.pad.setX(coords.x)
  }

  /**
   *
   * @param event
   */
  Level1.prototype.onPointerDown = function (event) {
    //this.PhysicsManager.applyForce(this.ball.body,  0, -0.05)
    if (this.started === false) {
      for (let object of this.objects) {
        if (object instanceof Ball && this.didStart === false) {
          this.didStart = true
          object.wakeUp()
          object.fire()
        }
      }
      this.started = true
    }
    console.log(this.pad.y)
  }

  Level1.prototype.onKeyPress = function(event) {
    console.log('onKeyPress')
    /**
     * Moving the character.
     */
    if (this.InputManager.isDown('left')) {
      console.log('left')
    } else if (this.InputManager.isDown('right')) {
      console.log('right')
    }
  }

  /**
   * Update the current scene for physics.
   *
   * @param {number} delta - the delta since last update
   */
  Level1.prototype.fixedUpdate = function (delta) {
    GameLevel.prototype.fixedUpdate.call(this, delta)
    this.PhysicsManager.update(delta)
  }

  /**
   *
   * @param {number} delta - the time difference since the last tick
   */
  Level1.prototype.update = function (delta) {
    GameLevel.prototype.update.call(this, delta)

    for (let object of this.objects) {
      if (object instanceof Ball && this.didStart === false) {
         object.setX(this.pad.body.position.x)
      }
      object.update(delta)
    }
  }

  return Level1
})
