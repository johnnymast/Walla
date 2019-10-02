/**
 * @author       Johnny Mast <mastjohnny@gmail.com>
 * @copyright    2019 Prophecy.
 * @license      {@link https://github.com/prophecyjs/prophecy/blob/master/license.txt|MIT License}
 */


let config = {
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x1099bb,
  transparent: true
}

let game = new Prophecy.Game(config)

game.createScene('Main', {
  init () {
    console.log('1 init')
  },
  preload () {
    console.log('1 preload')
  },
  create () {
    console.log('1 created')
  },
  movedToScene (scene) {
    console.log('1 Game moved to scene ', scene.name)
  },
  movedFromScene (scene) {
    console.log('1 Game moved from scene ', scene.name)
  },
  update () {
    console.log('1 update')
  }
})

game.createScene('2Main', {
  init () {
    console.log('2 init')
  },
  preload () {
    console.log('2 preload')
  },
  create () {
    console.log('2 created')
    this.game.scenes.switchTo('Main')
  },
  movedToScene (scene) {
    console.log('2 Game moved to scene ', scene.name)
  },
  movedFromScene (scene) {
    console.log('2 Game moved from scene ', scene.name)
  },
  update () {
    console.log('2 update')
  }
})

game.start('2Main')