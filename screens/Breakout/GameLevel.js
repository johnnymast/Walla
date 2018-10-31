define(['pixi', 'matter-js', 'core/Level', 'core/input/KeyboardInput', 'gui/Statistics', 'objects/Breakout/GameOver'], function (pixi, Matter, Level, KeyboardInput, Statistics, GameOver) {
  var GameLevel = function (options) {
    Level.call(this, options)


    this.statistics = new Statistics()
    this.addChild(this.statistics)

    /**
     * The score text on the screen.
     * @type {PIXI.Text}
     */
    this.scoreText = null

    /**
     * The lives text on the screen.
     * @type {null}
     */
    this.livesText = null

    /**
     * The physics engine the inside the wall is leaning into the level.
     * @type {number}
     * @default 10
     */
    this.wall_inset = 10

    /**
     * If you want to debug the physics engine set this value
     * to true.
     * @type {boolean}
     * @default false
     */
    this.showPhysics = true

    if (this.showPhysics === false)
      this.PhysicsManager.run()
  }

  extend(GameLevel, Level)

  /**
   * Reset the level to the default values.
   */
  GameLevel.prototype.reset = function () {
    this.score = 0
    this.lives = 5

    this.setLives(this.lives)
    this.setScore(this.score)
  }

  /**
   * Switch the FPS counter on/off.
   * @param {boolean} visible - should the FPS tracker be visible.
   */
  GameLevel.prototype.setDisplayStats = function (visible = false) {
    this.statistics.visible = visible
  }

  /**
   * The onStart callback.
   */
  GameLevel.prototype.onStart = function () {

    let background = new PIXI.Sprite(PIXI.Texture.WHITE)
    background.width = this.app.screen.width
    background.height = this.app.screen.height
    background.alpha = 0

    let wallOptions = {frictionStatic: 0, frictionAir: 0, isStatic: true, friction: 0, restitution: 1}

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

    /**
     * Create the GameOver screen
     * @type {GameOver}
     */
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

  /**
   * Return the score for this round.
   * @returns {number}
   */
  GameLevel.prototype.getScore = function () {
    return this.score
  }

  /**
   * Return the remaining lives for this round.
   * @returns {number}
   */
  GameLevel.prototype.getLives = function () {
    return this.lives
  }

  /**
   * Update the score on the screen.
   * @param {number} [score=0] - the score to display.
   */
  GameLevel.prototype.setScore = function (score = 0) {
    this.score = score
    this.scoreText.text = 'SCORE: ' + this.score
  }

  /**
   * Update the number of lives on the screen.
   * @param {number} [lives=0] - the number of lives to display.
   */
  GameLevel.prototype.setLives = function (lives = 0) {
    this.lives = lives
    this.livesText.text = 'LIVES: ' + this.lives
  }

  /**
   * The update function for the physics.
   * @param {number} delta - the time passed since last tick.
   */
  GameLevel.prototype.fixedUpdate = function (delta) {
    // Not implemented yet
  }

  /**
   * Update the game scene.
   * @param {number} delta - the time passed since last tick.
   */
  GameLevel.prototype.update = function (delta) {
    this.statistics.update(delta)
  }

  return GameLevel
})
