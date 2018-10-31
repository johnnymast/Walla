class Text extends PIXI.Container {
  constructor (text = '') {
    super()

    /**
     * @type {PIXI.TextStyle}
     */
    this.textStyle = new PIXI.TextStyle({
      fontFamily: 'Helvetica',
      fontSize: 120,
      fill: ['#ffffff'],
    })
    
    /**
     * @type {PIXI.Text}
     */
    this.richText = new PIXI.Text(text, this.textStyle)

    /**
     * Add the text object to the stage
     */
    this.addChild(this.richText)
  }
}

module.exports = Text