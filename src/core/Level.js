define(['pixi', 'matter-js', 'core/Scene', 'core/objects/Barrier', 'core/input/KeyboardInput'], function (pixi, Matter, Scene, Barrier, KeyboardInput) {
  var Level = function (options) {
    Scene.call(this, options)

    this.on('mousemove', this.onMouseMove)
    this.on('pointerdown', this.onPointerDown)

    this.keyboardKeys = []
  }

  extend(Level, Scene)

  Level.prototype.listenSingleForKeyboardInput = function(keycode, keypress, keyup) {
    let key = new KeyboardInput(keycode);
    key.press = keypress || this.onKeyPress
    key.release = keyup || this.onKeyUp
    this.keyboardKeys.push(key);
  }

  Level.prototype.listenForKeyboardInputs = function(...keys) {
    let self = this;
    keys.forEach(function(keycode) {
      let key = new KeyboardInput(keycode);
      key.press = self.onKeyPress
      key.release = self.onKeyUp
      self.keyboardKeys.push(key);
    });
    console.log(this.keyboardKeys)
  }

  Level.prototype.onKeyPress = function(event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyPress events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See listenForKeyboardInputs
     * for more information.
     */
  }

  Level.prototype.onKeyUp = function(event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyUp events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See listenForKeyboardInputs
     * for more information.
     */
  }

  Level.prototype.onMouseMove = function(event) {
    /**
     * You can overwrite this function if you wish
     * to receive mouse move events.
     */
  }

  Level.prototype.onPointerDown = function(event) {
    /**
     * You can overwrite this function if you wish
     * to receive pointer down events.
     */
  }

  Level.prototype.onStart = function () {

    var ceiling = this.PhysicsManager.rectangle(0, 0, this.app.screen.width, 5, { isStatic: true });
    this.PhysicsManager.add(ceiling)

    var floor = this.PhysicsManager.rectangle(0, this.app.screen.height - 5, this.app.screen.width, 5, { isStatic: true });
    this.PhysicsManager.add(floor)

    var leftwall = this.PhysicsManager.rectangle(0, 0, 5, this.app.screen.height, { isStatic: true });
    this.PhysicsManager.add(leftwall)

    var rightwall = this.PhysicsManager.rectangle(this.app.screen.width-5, 0, 5, this.app.screen.height, { isStatic: true });
    this.PhysicsManager.add(rightwall)
  }
 
  return Level
})
