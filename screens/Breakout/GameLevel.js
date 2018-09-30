define(['pixi', 'matter-js', 'core/Scene', 'core/input/KeyboardInput', 'gui/Statistics', 'objects/Breakout/GameOver'], function (pixi, Matter, Scene, KeyboardInput, Statistics, GameOver) {
  var GameLevel = function (options) {
    Scene.call(this, options)

    this.on('mousemove', this.onMouseMove)
    this.on('pointerdown', this.onPointerDown)

    this.statistics = new Statistics()
    this.addChild(this.statistics)

    this.scoreText = null
    this.livesText = null

    this.wall_inset = 10
    this.showPhysics = true

    if (this.showPhysics === false)
      this.PhysicsManager.run()
  }

  extend(GameLevel, Scene)

  GameLevel.prototype.reset = function() {
    this.score = 0
    this.lives = 5

    this.setLives(this.lives)
    this.setScore(this.score)
  }

  GameLevel.prototype.setDisplayStats = function (visible) {
    this.statistics.visible = visible
  }

  GameLevel.prototype.onKeyPress = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyPress events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See listenForKeyboardInputs
     * for more information.
     */
  }

  GameLevel.prototype.onKeyUp = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyUp events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See listenForKeyboardInputs
     * for more information.
     */
  }

  GameLevel.prototype.onMouseMove = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive mouse move events.
     */
  }

  GameLevel.prototype.onPointerDown = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive pointer down events.
     */
  }

  GameLevel.prototype.onStart = function () {

    let background = new PIXI.Sprite(PIXI.Texture.WHITE)
    background.width = this.app.screen.width
    background.height = this.app.screen.height
    background.alpha = 0

    let wallOptions = { frictionStatic: 0, frictionAir: 0, isStatic: true, friction: 0, restitution: 1 }

    let ceiling = this.PhysicsManager.rectangle(this.app.screen.width / 2, 0, this.app.screen.width, this.wall_inset, wallOptions)
    ceiling.label = 'ceiling'
    this.PhysicsManager.add(ceiling)

    let floor = this.PhysicsManager.rectangle(this.app.screen.width / 2, this.app.screen.height, this.app.screen.width, this.wall_inset, wallOptions)
    floor.label = 'floor'
    this.PhysicsManager.add(floor)

    let leftwall = this.PhysicsManager.rectangle(0, this.app.screen.height / 2, this.wall_inset, this.app.screen.height, wallOptions)
    leftwall.label = 'leftwall'
    this.PhysicsManager.add(leftwall)

    let rightwall = this.PhysicsManager.rectangle(this.app.screen.width, this.app.screen.height / 2, this.wall_inset, this.app.screen.height, wallOptions)
    rightwall.label = 'rightwall'
    this.PhysicsManager.add(rightwall)

    let style = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 20,
      // fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440
    })

    this.scoreText = new PIXI.Text('SCORE: 0', style)
    this.scoreText.x = this.app.screen.width - this.scoreText.width - 45
    this.scoreText.y = 10

    this.livesText = new PIXI.Text('LIVES: 3', style)
    this.livesText.x = 45
    this.livesText.y = 10

    this.addChild(background)
    this.addChild(this.scoreText)
    this.addChild(this.livesText)

    this.gameover = new GameOver()
    this.gameover.on('gameover.respawn', () => {
      this.gameover.hide()
    })

    this.gameover.on('gameover.closed', () => {
      this.reset()
    })

    this.addChild(this.gameover)

    this.reset()
  }

  /**
   * Show the gameover screen to the user.
   */
  GameLevel.prototype.showGameOver = function () {
    this.interactive = false
    PIXI.sound.play('game_over')
    this.gameover.show()
  }

  GameLevel.prototype.getScore = function() {
    return this.score
  }

  GameLevel.prototype.getLives = function() {
    return this.lives
  }

  GameLevel.prototype.setScore = function (score) {
    this.score = score
    this.scoreText.text = 'SCORE: ' + this.score
  }

  GameLevel.prototype.setLives = function (lives) {
    this.lives = lives
    this.livesText.text = 'LIVES: ' + this.lives
  }

  GameLevel.prototype.fixedUpdate = function (delta) {
    // Empty
  }

  GameLevel.prototype.update = function (delta) {
    this.statistics.update(delta)
  }

  return GameLevel
})
