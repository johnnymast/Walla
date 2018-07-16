define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  let BaseDialog = function (options) {
    GameObject.call(this, options)

    this._options = options

    this.x = this._options.x
    this.y = this._options.y

    this.background = new PIXI.Container()
    this.background.width = this.width
    this.background.height = this.height
    this.background.name = 'background'
    this.addChild(this.background)

    this.content = new PIXI.Graphics()
    this.content.name = 'content'

    let content_outline_alpha = 0
    if (typeof this._options.outline_content !== 'undefined') {
      if (this._options.outline_content === true) {
        content_outline_alpha = 1
      }
    }

    this.content.lineStyle(2, 0xFF0000, content_outline_alpha)
    this.content.beginFill(0xFFFFFF, 0)
    this.content.drawRect(
      this._options.padding,
      this._options.padding,
      this._options.width - (this._options.padding * 2),
      this._options.height - (this._options.padding * 2),
    )

    this.addChild(this.content)
  }

  extend(BaseDialog, GameObject)
  /**
   *
   * @param {GameObject} content
   */
  BaseDialog.prototype.addContent = function (content) {
    if (content) {
      this.content.addChild(content)
    }
  }

  return BaseDialog
})
