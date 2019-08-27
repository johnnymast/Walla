// https://github.com/riebel/pixi-tiledmap
const DIRECTIONS = require('objects/Pixelshooter/Options').DIRECTIONS

define(['screens/PixelShooter/GameLevel', 'core/GameEngine', 'objects/Pixelshooter/Character'], function (GameLevel, GameEngine, Character) {
  let Level1 = function (options) {
    GameLevel.call(this, {backgroundColor: 0x1099bb})

    this.interactive = true
    this.map = new PIXI.extras.TiledMap('pixelshooter_map')
    this.character = new Character(1)
    this.character.anchor = 0.5

    this.InputManager.mapInput([this.InputManager.keys.ArrowUp, 'w'], ['up'])
    this.InputManager.mapInput([this.InputManager.keys.ArrowLeft, 'a'], ['left'])
    this.InputManager.mapInput([this.InputManager.keys.ArrowRight, 'd'], ['right'])
    this.InputManager.mapInput([this.InputManager.keys.ArrowDown, 's'], ['down'])
  }

  extend(Level1, GameLevel)

  /**
   * Respond to mouse movement
   *
   * @param {InteractionEvent } event - the pixi InteractionEvent 
   */
  Level1.prototype.onMouseMove = function (event) {

    function calculateAngle (mx, my, px, py) {
      var self = this
      var dist_Y = my - py
      var dist_X = mx - px
      var angle = Math.atan2(dist_Y, dist_X)
      //var degrees = angle * 180/ Math.PI;
      // radians = Math.atan2(y2-y1,x2-x1);
      return angle
    }

    /**
     * You can overwrite this function if you wish
     * to receive mouse move events.
     */
    let mousePos = event.data.global
    let angle = calculateAngle(mousePos.x, mousePos.y, this.character.x, this.character.y)
    let degrees = Math.floor(angle * 90 / Math.PI)

    let direction_mapping = [

      {mouseX: DIRECTIONS.LEFT, mouseY: DIRECTIONS.UP, direction: DIRECTIONS.DIAGUP_LEFT},
      {mouseX: DIRECTIONS.RIGHT, mouseY: DIRECTIONS.UP, direction: DIRECTIONS.DIAGUP_RIGHT},
      {mouseX: DIRECTIONS.RIGHT, mouseY: DIRECTIONS.DOWN, direction: DIRECTIONS.DIAGDOWN_RIGHT},
      {mouseX: DIRECTIONS.LEFT, mouseY: DIRECTIONS.DOWN, direction: DIRECTIONS.DIAGDOWN_LEFT},
    ]

    let direction = null

    for (map of direction_mapping) {
      let mx = (mousePos.x > this.character.position.x) ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT
      let my = (mousePos.y > this.character.position.y) ? DIRECTIONS.DOWN : DIRECTIONS.UP

      /*
       * Detect diagonal directions
       */
      if (map.mouseX === mx && map.mouseY === my) {
        direction = map.direction
      }

      if (direction)
        break
    }
  }

  /**
   * The onStart callback called from the Scene object.
   */
  Level1.prototype.onInit = function () {
    GameLevel.prototype.onInit.call(this)
    this.addCursor('attack', '1crosshair')

    /**
     * Add the map to the screen
     */
    this.addChild(this.map)

    this.character.position.set(430, 443)
    this.character.setDirection(DIRECTIONS.RIGHT)

    /**
     * Add the character to the screen
     */
    this.addChild(this.character)

    /**
     * Show the FPS counterO
     */
    this.setDisplayStats(true)

    /**
     * Set the attack cursor
     */
    this.setCursor('attack')
  }

  Level1.prototype.spawnEnemy = function () {
    // TODO: Add code here
  }

  Level1.prototype.updateGameLogic = function (delta) {

    /**
     * Moving the character.
     */
    if (this.InputManager.isDown('left')) {
      this.character.position.x -= 5
    } else if (this.InputManager.isDown('right')) {
      this.character.position.x += 5
    } else if (this.InputManager.isDown('up')) {
      this.character.position.y -= 5
    } else if (this.InputManager.isDown('down')) {
      this.character.position.y += 5
    }

    this.character.update(delta)
  }

  /**
   * Update the current scene.
   *
   * @param {number} delta - the delta since last update
   */
  Level1.prototype.update = function (delta) {
    GameLevel.prototype.update.call(this, delta)
    this.updateGameLogic(delta)
  }

  return Level1
})
