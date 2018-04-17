define(['pixi', 'matter-js', 'core/Scene', 'core/../../objects/Breakout/Barrier', 'core/input/KeyboardInput'], function (pixi, Matter, Scene, Barrier, KeyboardInput) {
  var GameLevel = function (options) {
    Scene.call(this, options)

    this.on('mousemove', this.onMouseMove)
    this.on('pointerdown', this.onPointerDown)

    this.keyboardKeys = []

    this.scoreText = null;
    this.livesText = null;

    this.score = 0
    this.lives = 3
  }

  extend(GameLevel, Scene)

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

    this.addChild(background);
  }

  return GameLevel
})
