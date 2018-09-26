// https://github.com/SonarSystems/Cocos2d-JS-v3-Tutorial-57---Adding-A-Menu-Image-Item/blob/master/src/app.js

define(['pixi', 'screens/Breakout/GameLevel', 'core/GameEngine', 'objects/Breakout/Brick', 'objects/Breakout/Pad', 'objects/Breakout/Ball'], function (pixi, GameLevel, GameEngine, Brick, Pad, Ball, GameOver) {
  let Level1 = function (options) {
    GameLevel.call(this, {backgroundColor: 0x1099bb})

    this.startY = 50
    this.num_bricks = 11
    this.started = false
    this.setDisplayStats(true)
    this.didStart = false
    this.objects = []

    // TODO: Comments
    // TODO: Sounds
    // TODO: Remove old code like this.started (should be this.
    // TODO: Add keymapper
    // TODO: Reset force if dead
    // TODO: Move gameover to GameLevel
  }

  extend(Level1, GameLevel)

  Level1.prototype.onStart = function () {
    GameLevel.prototype.onStart.call(this)


    /**
     * Make the pad controllable with left and right arrows as well as
     * a and d for moving left and right. This is in addition to mouse
     * support.
     */
    this.InputManager.mapInput([this.InputManager.keys.ArrowLeft, 'a'], ['left'])
    this.InputManager.mapInput([this.InputManager.keys.ArrowRight, 'd'], ['right'])


    /**
     * Setup world physics
     * @type {Matter.World}
     */
    let world = this.PhysicsManager.getWorld()
    world.gravity.y = .85


    this.reset()
    //
    // PIXI.sound.play('level1_music');
    // PIXI.sound.play('game_over');

    this.pad = new Pad(PIXI.Texture.fromFrame('paddleBlu.png'))
    this.pad.setPosition(this.app.screen.width / 2, this.app.screen.height - 100)

    var tx = PIXI.Texture.fromFrame('ballBlue.png')
    this.ball = new Ball(tx)
    this.ball.setPosition(this.pad.body.position.x, this.pad.body.position.y - this.pad.sprite.height)
    this.ball.onCollisionWith = (withOnbject, object) => {

      if (withOnbject.label == 'Pad') {
        let MAX_VELOCITY = 50
        var taxaAumentoVelocidade = 5
        // console.log('hi with pad', withOnbject)
        this.PhysicsManager.setVelocity(this.ball.body, {
          x: this.ball.body.velocity.x + taxaAumentoVelocidade,
          y: this.ball.body.velocity.y + taxaAumentoVelocidade
        })

      } else if (withOnbject.label == 'Brick') {

        let brick = this.objects.filter((item) => {
          return (item.body.id === withOnbject.id)
        })

        if (brick.length > 0) {
          brick = brick[0]
        }

        brick.decareaseHealth()
        brick.showHit()
      } else if (withOnbject.label == 'floor' && this.didStart == true) {

        this.lives--

        this.setLives(this.lives)

        this.ball.sleep()
        this.didStart = false
        this.ball.setPosition(this.pad.body.position.x, this.pad.body.position.y - this.pad.sprite.height)

        if (this.getLives() === 0) {
          this.showGameOver()
        }
      }
    }

    this.objects.push(this.ball)
    this.objects.push(this.pad)

    this.addChild(this.ball.sprite)
    this.addChild(this.pad.sprite)

    this.PhysicsManager.run()
    //

  }

  Level1.prototype.reset = function () {
    GameLevel.prototype.reset.call(this)

    this.didStart = false

    for (let i = 0; i < this.objects.length; i++) {
      let object = this.objects[i]
      if (object instanceof Brick) {

        /**
         * Cleanup the Brick's internals
         */
        object.destroy()

        /**
         * Remove the Brick from the scene.
         */
        this.removeChild(object)

        /**
         * Stop tracking this Brick. Its destroyed.
         */
        this.objects.splice(i, 1)
      }
    }

    let bricks = {
      'red': PIXI.Texture.fromFrame('element_red_rectangle.png'),
      'yellow': PIXI.Texture.fromFrame('element_yellow_rectangle.png'),
      'green': PIXI.Texture.fromFrame('element_green_rectangle.png'),
      'blue': PIXI.Texture.fromFrame('element_blue_rectangle.png'),
    }


    let y = this.startY


    for (let key of Object.keys(bricks)) {
      let texture = bricks[key]
      for (let x = 45; x < (this.num_bricks * texture.width); x += texture.width) {
        let brick = new Brick(key, texture)
        brick.name = 'Brick' + this.objects.length + 1
        brick.setPosition(x + (texture.width * 0.5), y + (texture.height * 0.5))

        this.objects.push(brick)
        this.addChild(brick.sprite)
      }
      y += texture.height + 1
    }



    this.setLives(this.lives)
    this.setScore(this.score)

    this.interactive = true
  }

  Level1.prototype.onMouseMove = function (event) {
    let coords = event.data.global
    if (coords.x + this.pad._width / 2 > (this.app.screen.width - this.wall_inset)) {
      coords.x = this.app.screen.width - (this.pad._width / 2) - this.wall_inset
    } else if (coords.x - this.pad._width / 2 < this.pad._width / 2) {
      coords.x = this.wall_inset + this.pad._width / 2
    }
    this.pad.setX(coords.x)
  }

  /**
   *
   * @param event
   */
  Level1.prototype.onPointerDown = function (event) {
    if (this.didStart === false) {
      for (let object of this.objects) {
        if (object instanceof Ball) {
          this.didStart = true
          object.wakeUp()
          object.fire()
        }
      }
      this.started = true
    }
    console.log(this.pad.y)
  }

  Level1.prototype.onKeyPress = function (event) {
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

  Level1.prototype.showGameOver = function () {
    this.interactive = false
    this.gameover.show()
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

    for (let i = 0; i < this.objects.length; i++) {
      let object = this.objects[i]

      if (object instanceof Ball && this.didStart === false) {
        object.setX(this.pad.body.position.x)
      }
      if (object instanceof Brick) {
        if (object.isDestroyed() == true) {

          this.setScore(this.getScore() + object.getPointValue())
          /**
           * Cleanup the Brick's internals
           */
          object.destroy()

          /**
           * Remove the Brick from the scene.
           */
          this.removeChild(object)

          /**
           * Stop tracking this Brick. Its destroyed.
           */
          this.objects.splice(i, 1)
          continue
        }
      }
      object.update(delta)
    }

    this.gameover.update(delta)
  }

  return Level1
})
