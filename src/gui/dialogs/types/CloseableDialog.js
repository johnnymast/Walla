const Buttons = require('gui/buttons')

define(['pixi', 'gui/dialogs/types/BaseDialog'], function (pixi, BaseDialog) {
  let CloseableDialog = function (options) {

    this.options = {
      x: 0,
      y: 0,
      width: 300,
      height: 100,
      background_texture: 'panel_woodDetail.png',
      padding: 30,
      // outline_content: true,
    }

    this.options = extend2(true, this.options, options)

    BaseDialog.call(this, this.options)
    this.init()
  }

  extend(CloseableDialog, BaseDialog)

  CloseableDialog.prototype.init = function () {
    this.setupBackground()
    this.setupButtons()
  }

  /**
   * Create the background
   */
  CloseableDialog.prototype.setupBackground = function () {
    this.bgMesh = new pixi.mesh.NineSlicePlane(pixi.Texture.fromImage(this.options.background_texture))
    this.bgMesh.width = this.options.width
    this.bgMesh.height = this.options.height
    this.bgMesh.x = 0
    this.bgMesh.y = 0

    this.background.addChild(this.bgMesh)
  }
  CloseableDialog.prototype.setupButtons = function () {
    let close_button = new Buttons.ImageButton({
      text: '',
      width: 24,
      height: 24,
      x: this.background.width - 24/2,
      y: -(24/2),
      state: {
        default: {
          texture: 'button_woodClose.png'
        },
        hover: {
          texture: 'button_woodClose.png'
        },
        clicked: {
          texture: 'button_woodCircle.png'
        }
      }
    });

    close_button.onClick = () => {
      this.parent.emit('internal.state.closing')
    }

    close_button.activate()
    this.addChild(close_button)
  }

  return CloseableDialog
})
