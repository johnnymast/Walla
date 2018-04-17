define(['pixi', 'matter-js', 'core/Scene', 'core/../../objects/Breakout/Barrier', 'core/input/KeyboardInput', 'gui/Statistics'], function (pixi, Matter, Scene, Barrier, KeyboardInput, Statistics) {
  var GameLevel = function (options) {
    Scene.call(this, options)

    this.on('mousemove', this.onMouseMove)
    this.on('pointerdown', this.onPointerDown)

    this.statistics = new Statistics()
    this.addChild(this.statistics);

    this.keyboardKeys = []

    this.scoreText = null;
    this.livesText = null;

    this.score = 0
    this.lives = 3
  }

  extend(GameLevel, Scene)

  GameLevel.prototype.setDisplayStats = function (visible) {
    this.statistics.visible = visible
  }

  GameLevel.prototype.listenSingleForKeyboardInput = function(keycode, keypress, keyup) {
    let key = new KeyboardInput(keycode);

    key.press.bind(this);
    key.release.bind(this);

    key.press = keypress || self.onKeyPress.bind(self)
    key.release = keyup || self.onKeyUp.bind(self)

    this.keyboardKeys.push(key);
  }

  GameLevel.prototype.listenForKeyboardInputs = function(...keys) {
    let self = this;
    keys.forEach(function(keycode) {
      let key = new KeyboardInput(keycode);

      key.press = self.onKeyPress.bind(self)
      key.release = self.onKeyUp.bind(self)

      self.keyboardKeys.push(key);
    });
  }

  GameLevel.prototype.onKeyPress = function(event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyPress events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See listenForKeyboardInputs
     * for more information.
     */
  }

  GameLevel.prototype.onKeyUp = function(event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyUp events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See listenForKeyboardInputs
     * for more information.
     */
  }

  GameLevel.prototype.onMouseMove = function(event) {
    /**
     * You can overwrite this function if you wish
     * to receive mouse move events.
     */
  }

  GameLevel.prototype.onPointerDown = function(event) {
    /**
     * You can overwrite this function if you wish
     * to receive pointer down events.
     */
  }

  GameLevel.prototype.onStart = function () {

    var background = new PIXI.Sprite(PIXI.Texture.WHITE);
    background.width = this.app.screen.width;
    background.height = this.app.screen.height;
    background.alpha = 0
    
    var ceiling = this.PhysicsManager.rectangle(0, 0, this.app.screen.width, 5, { isStatic: true });
    this.PhysicsManager.add(ceiling)

    var floor = this.PhysicsManager.rectangle(0, this.app.screen.height - 5, this.app.screen.width, 5, { isStatic: true });
    this.PhysicsManager.add(floor)

    var leftwall = this.PhysicsManager.rectangle(0, 0, 5, this.app.screen.height, { isStatic: true });
    this.PhysicsManager.add(leftwall)

    var rightwall = this.PhysicsManager.rectangle(this.app.screen.width-5, 0, 5, this.app.screen.height, { isStatic: true });
    this.PhysicsManager.add(rightwall)

    var style =new pixi.TextStyle({
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
    });

    this.scoreText = new pixi.Text('SCORE: 0', style);
    this.scoreText.x = this.app.screen.width - this.scoreText.width - 45
    this.scoreText.y = 10;

    this.livesText = new pixi.Text('LIVES: 3', style);
    this.livesText.x = 45;
    this.livesText.y = 10

    this.addChild(background);
    this.addChild(this.scoreText);
    this.addChild(this.livesText);
  }

  GameLevel.prototype.setScore = function(score) {
    this.score = score
    this.scoreText.text = 'SCORE: '+this.score
  }

  GameLevel.prototype.setLives = function(lives) {
    this.lives = lives
    this.livesText.text = 'LIVES: '+this.lives
  }

  GameLevel.prototype.update = function(delta) {
    this.statistics.update(delta)
  }

  return GameLevel
})
