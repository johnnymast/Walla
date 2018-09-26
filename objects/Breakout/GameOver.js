const Dialogs = require('gui/dialogs')
const Buttons = require('gui/buttons')

define(['pixi', 'core/GameObject', 'tweenjs'], function (PIXI, GameObject, TweenJS) {
  let GameOver = function (options) {
    GameObject.call(this, options)

    let width = 400
    let height = 200

    this.width = width
    this.height = height
    this.init_x = this.app.screen.width / 2 - width / 2
    this.init_y = -height * 2

    this.dialog = new Dialogs.CloseableDialog({
      width: 400,
      height: 160,
      x: this.app.screen.width / 2 - width / 2,
      y: this.app.screen.height / 2 - height / 2,
    })

    this.dialog.close_button.visible = false

    let titleStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 27,
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5, wordWrap: true,
      wordWrapWidth: 440
    })

    this.gameOverTitle = new PIXI.Text('Gameover', titleStyle)
    this.gameOverTitle.x = width / 2 - this.gameOverTitle.width / 2
    this.gameOverTitle.y = 10

    let textStyle = new PIXI.TextStyle({
      fontFamily: 'Arial',
      fontSize: 18,
      fill: ['#ffffff'],
      wordWrap: true,
      wordWrapWidth: 350
    })

    this.gameOverText = new PIXI.Text('You has lost all your lives, press RESPAWN to try again.', textStyle)
    this.gameOverText.x = 10
    this.gameOverText.y = this.gameOverTitle.y + 45

    this.respawn_button = new Buttons.BaseButton({
      text: 'RESPAWN',
      width: 100,
      height: 45,
      state: {
        default: {
          texture: 'panel_boltsBlue.png',
          text: 'RESPAWN',
          radius: 0,
        },
        hover: {
          texture: 'panel_boltsBlue.png',
          text: 'RESPAWN',
          radius: 0,
        },
        clicked: {
          texture: 'panel_boltsBlue.png',
          text: 'RESPAWN',
          radius: 0,
        }
      }
    })

    this.respawn_button.x = width / 2 - this.respawn_button.width / 2
    this.respawn_button.y = this.gameOverText.y + 45

    this.respawn_button.interactive = true
    this.respawn_button.buttonMode = true

    this.respawn_button.onClick = () => {
      this.emit('gameover.respawn')
    }

    this.dialog.addContent(this.gameOverTitle)
    this.dialog.addContent(this.gameOverText)
    this.dialog.addContent(this.respawn_button)

    this.dialog.x = this.init_x
    this.dialog.y = this.init_y

    this.addChild(this.dialog)
  }

  extend(GameOver, GameObject)

  GameOver.prototype.show = function () {
    let coords = {x: this.init_x, y: this.init_y, useTicks: false}
    this.tween = new TweenJS.Tween(coords)
      .to({y: this.app.screen.height / 2 - this.height / 2}, 500)
      .easing(TweenJS.Easing.Circular.In)
      .onUpdate(() => {
        this.dialog.x = coords.x
        this.dialog.y = coords.y
      })
      .onComplete(() => {
        this.emit('gameover.opended')
      })
      .start()
  }

  GameOver.prototype.hide = function () {
    let coords = {x: this.dialog.x, y: this.dialog.y, useTicks: false}
    this.tween = new TweenJS.Tween(coords)
      .to({y: this.init_y}, 500)
      .easing(TweenJS.Easing.Circular.In)
      .onUpdate(() => {
        this.dialog.x = coords.x
        this.dialog.y = coords.y
      })
      .onComplete(() => {
        this.emit('gameover.closed')
      })
      .start()
  }

  GameOver.prototype.update = function(delta) {
    TweenJS.update()
  }
  return GameOver
})
