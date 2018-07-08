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

  Menu.prototype.addMenuItem = function (item) {
    this.items.push(item)
    this.addChild(item)
    this.arangeItems()
  }

  Menu.prototype.arangeItems = function () {
    // TODO: Add code here
  }

  Menu.prototype.addMenuItemAt = function (item, index) {
    if (index < 0 || index > this.items.length) {
      throw new Error(`${item}addChildAt: The index ${index} supplied is out of bounds ${this.items.length}`)
    }

    this.items.splice(index, 0, child)

    var ret = this.addChildAt(item.index)
    this.arangeItems()
    return ret
  }

  Menu.prototype.update = function (delta) {
    for (item of this.items) {
      this.item.update(delta)
    }
  }

  return Menu
})
