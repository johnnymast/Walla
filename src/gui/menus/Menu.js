const GameObject = require('core/GameObject')

class Menu extends GameObject {
  constructor (options) {
    super(options)

    this.options = {
      items: {
        paddingTop: 0,
        paddingBottom: 5
      }
    }

    this.options = merge(this.options, options)
    this.items = []
  }

  /**
   * Add a menu item to the menu.
   *
   * @param {MenuItem} item - the item to add
   */
  addMenuItem (item) {
    this.items.push(item)
    this.addChild(item)
    this.arangeItems()
  }

  getMenuItems () {
    return this.items
  }

  /**
   * Place menu items on their given position.
   *
   * @deprecated maybe not sure yet
   */
  arangeItems () {
    // TODO: Add code here
  }

  /**
   *
   * @param {MenuItem} item - a menu item to add
   * @param {number} index - add the item at this index
   * @return {PIXI.DisplayObject|*}
   */
  addMenuItemAt (item, index) {
    if (index < 0 || index > this.items.length) {
      throw new Error(`${item}addChildAt: The index ${index} supplied is out of bounds ${this.items.length}`)
    }

    this.items.splice(index, 0, child)

    let ret = this.addChildAt(item.index)
    this.arangeItems()
    return ret
  }

  /**
   * Update the menu.
   *
   * @param {number} delta - the time difference since last tick in the game
   */
  update (delta) {
    for (item of this.items) {
      this.item.update(delta)
    }
  }

}

module.exports = Menu