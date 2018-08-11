define(['pixi', 'core/GameObject'], function (pixi, GameObject) {
  var Menu = function (options, ...items) {
    GameObject.call(this, options)

    this.options = {
      items: {
        paddingTop: 0,
        paddingBottom: 5
      }
    }

    this.options = merge(this.options, options)
    this.items = []
  }

  extend(Menu, GameObject)

  /**
   * Add a menu item to the menu.
   *
   * @param {MenuItem} item - the item to add
   */
  Menu.prototype.addMenuItem = function (item) {
    this.items.push(item)
    this.addChild(item)
    this.arangeItems()
  }

  /**
   * Place menu items on their given position.
   *
   * @deprecated maybe not sure yet
   */
  Menu.prototype.arangeItems = function () {
    // TODO: Add code here
  }

  /**
   *
   * @param {MenuItem} item - a menu item to add
   * @param {number} index - add the item at this index
   * @return {PIXI.DisplayObject|*}
   */
  Menu.prototype.addMenuItemAt = function (item, index) {
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
  Menu.prototype.update = function (delta) {
    for (item of this.items) {
      this.item.update(delta)
    }
  }

  return Menu
})
