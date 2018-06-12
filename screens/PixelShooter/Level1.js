// https://github.com/riebel/pixi-tiledmap
define(['screens/PixelShooter/GameLevel', 'core/GameEngine', 'objects/pixelshooter/Character'], function (GameLevel, GameEngine, Character) {
  var Level1 = function (options) {
    GameLevel.call(this, {backgroundColor: 0x1099bb})

    // s: 83
    // a: 65
    // w: 87
    // d: 68
    this.listenForKeyboardInputs(83, 65, 87, 68)
    this.map = new PIXI.extras.TiledMap('pixelshooter_map')
    this.enemies = []
  }

  extend(Level1, GameLevel)

  Level1.prototype.onKeyPress = function (event) {
    /**
     * You can overwrite this function if you wish
     * to receive keyboard keyPress events.
     *
     * Please note: These events will only be triggered
     * by registered keys. See listenForKeyboardInputs
     * for more information.
     */
    console.log('event', event)
  }

  Level1.prototype.onStart = function () {
    GameLevel.prototype.onStart.call(this)

    /**
     * Add the map to the screen
     */
    this.addChild(this.map)

    let character = new Character;

    this.addChild(character);

    /**
     * Show the FPS counterO
     */
    this.setDisplayStats(true)
  }

  Level1.prototype.spawnEnamy = function () {

  }

  Level1.prototype.update = function (delta) {
    GameLevel.prototype.update.call(this, delta)

  }

  return Level1
})
