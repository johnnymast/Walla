const Matter = require('../../src/plugins/matterjs')

class PhysicsSprite extends Matter.PhysicsSprite {
  constructor (texture) {
    super(texture)
  }
}

module.exports = PhysicsSprite
