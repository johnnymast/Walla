// https://github.com/riebel/pixi-tiledmap
const DIRECTIONS = require('objects/Pixelshooter/Options').DIRECTIONS
const GameLevel = require('screens/PixelShooter/GameLevel')
const GameEngine = require('core/GameEngine')
const Character = require('objects/Pixelshooter/Character')

class Level1 extends GameLevel {
  constructor (options) {
    super({ backgroundColor: 0x1099bb })

    this.ge = GameEngine.get();
    let Tiled = this.ge.get('Tiled')
    this.map = PIXI.loader.resources['pixelshooter_map']
    console.log('Tiled.TiledMap', Tiled.default)
    return
    this.interactive = true

    this.character = new Character(1)
    this.character.anchor = 0.5
    //
    this.InputManager.mapInput([this.InputManager.keys.ArrowUp, 'w'], ['up'])
    this.InputManager.mapInput([this.InputManager.keys.ArrowLeft, 'a'], ['left'])
    this.InputManager.mapInput([this.InputManager.keys.ArrowRight, 'd'], ['right'])
    this.InputManager.mapInput([this.InputManager.keys.ArrowDown, 's'], ['down'])
  }

  // /**
  //  * Respond to mouse movement
  //  *
  //  * @param {InteractionEvent } event - the pixi InteractionEvent 
  //  */
  // onMouseMove (event) {
  //
  //   function calculateAngle (mx, my, px, py) {
  //     var self = this
  //     var dist_Y = my - py
  //     var dist_X = mx - px
  //     var angle = Math.atan2(dist_Y, dist_X)
  //     //var degrees = angle * 180/ Math.PI;
  //     // radians = Math.atan2(y2-y1,x2-x1);
  //     return angle
  //   }
  //
  //   /**
  //    * You can overwrite this function if you wish
  //    * to receive mouse move events.
  //    */
  //   let mousePos = event.data.global
  //   let angle = calculateAngle(mousePos.x, mousePos.y, this.character.x, this.character.y)
  //   let degrees = Math.floor(angle * 90 / Math.PI)
  //
  //   let direction_mapping = [
  //
  //     { mouseX: DIRECTIONS.LEFT, mouseY: DIRECTIONS.UP, direction: DIRECTIONS.DIAGUP_LEFT },
  //     { mouseX: DIRECTIONS.RIGHT, mouseY: DIRECTIONS.UP, direction: DIRECTIONS.DIAGUP_RIGHT },
  //     { mouseX: DIRECTIONS.RIGHT, mouseY: DIRECTIONS.DOWN, direction: DIRECTIONS.DIAGDOWN_RIGHT },
  //     { mouseX: DIRECTIONS.LEFT, mouseY: DIRECTIONS.DOWN, direction: DIRECTIONS.DIAGDOWN_LEFT },
  //   ]
  //
  //   let direction = null
  //
  //   for (map of direction_mapping) {
  //     let mx = (mousePos.x > this.character.position.x) ? DIRECTIONS.RIGHT : DIRECTIONS.LEFT
  //     let my = (mousePos.y > this.character.position.y) ? DIRECTIONS.DOWN : DIRECTIONS.UP
  //
  //     /*
  //      * Detect diagonal directions
  //      */
  //     if (map.mouseX === mx && map.mouseY === my) {
  //       direction = map.direction
  //     }
  //
  //     if (direction)
  //       break
  //   }
  // }
  //
  // /**
  //  * The onStart callback called from the Scene object.
  //  */
  // onInit () {
  //   GameLevel.prototype.onInit.call(this)
  //   this.addCursor('attack', '1crosshair')
  //
  //   /**
  //    * Add the map to the screen
  //    */
  //   this.addChild(this.map)
  //
  //   this.character.position.set(430, 443)
  //   this.character.setDirection(DIRECTIONS.RIGHT)
  //
  //   /**
  //    * Add the character to the screen
  //    */
  //   this.addChild(this.character)
  //
  //   /**
  //    * Show the FPS counterO
  //    */
  //   this.setDisplayStats(true)
  //
  //   /**
  //    * Set the attack cursor
  //    */
  //   this.setCursor('attack')
  // }
  //
  // spawnEnemy () {
  //   // TODO: Add code here
  // }
  //
  // updateGameLogic (delta) {
  //
  //   /**
  //    * Moving the character.
  //    */
  //   if (this.InputManager.isDown('left')) {
  //     this.character.position.x -= 5
  //   } else if (this.InputManager.isDown('right')) {
  //     this.character.position.x += 5
  //   } else if (this.InputManager.isDown('up')) {
  //     this.character.position.y -= 5
  //   } else if (this.InputManager.isDown('down')) {
  //     this.character.position.y += 5
  //   }
  //
  //   this.character.update(delta)
  // }

  // /**
  //  * Update the current scene.
  //  *
  //  * @param {number} delta - the delta since last update
  //  */
  // update (delta) {
  //   GameLevel.prototype.update.call(this, delta)
  //   this.updateGameLogic(delta)
  // }
}

module.exports = Level1
