class CameraInfo extends PIXI.Container {
  constructor (camera) {
    super()

    this.options = {
      visible: true,
      lineWidth: 2,
      panel: null,
      frame: null,
      info: null,
      text: {
        paddingLeft: 5,
        paddingButton: 5,
      }
    }

    this.camera = camera

    this.hide()
    this.init()
  }

  init () {
    let panel = new PIXI.Container()
    panel.x = panel.y = 0

    let frame = new PIXI.Graphics()

    const style = new PIXI.TextStyle({
      fontFamily: 'monospace',
      fontSize: 14,
      fill: ['#FFFFFF'], // gradient
    })

    let text = new PIXI.Text('', style)
    text.x = text.y = 0
    frame.addChild(text)
    panel.addChild(frame)

    this.options.frame = frame
    this.options.info = text

    this.addChild(panel)
  }

  show () {
    this.visible = true
  }

  hide () {
    this.visible = false
  }

  update () {

    let camera = this.camera

    let msg = `Camera (${camera.viewport.width} x ${camera.viewport.height})\n`
      + `X: ${camera.viewport.x} Y: ${camera.viewport.y}\n`
      + `Bounds x: ${camera.world.bounds.x} Y: ${camera.world.bounds.y} w: ${camera.world.bounds.width} h: ${camera.world.bounds.height}\n`
      + `View x: ${camera.viewport.x} Y: ${camera.viewport.y} w: ${camera.viewport.height} h: ${camera.viewport.height}`

    this.options.info.text = msg
    this.options.frame.clear()
    this.options.frame.lineStyle(this.options.lineWidth, 0xFF0000, 1)
    this.options.frame.drawRect(0, 0, camera.viewport.width - this.options.lineWidth, camera.viewport.height - this.options.lineWidth)
    this.options.frame.endFill()

    this.options.info.x = this.options.text.paddingLeft
    this.options.info.y = (camera.viewport.height - this.options.info.height) - this.options.text.paddingButton
  }
}

module.exports = CameraInfo