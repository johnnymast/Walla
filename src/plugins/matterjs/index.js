const pkg = require('../deps')

const PhysicsManager = require('./PhysicsManager')
const PhysicsSprite = require('./PhysicsSprite')

module.exports = {
  PhysicsManager: PhysicsManager,
  PhysicsSprite: PhysicsSprite,
}

// pkg.moduleExists('pixi' /* take care of absolute paths */)
//   .then(() => {
//
//     const PhysicsManager = require('./PhysicsManager')
//
//     module.exports = {
//       PhysicsManager
//     };
//
//     console.log('did export')
//   })
//   .catch(() => { throw Error('Plugins: Module matter-js was not found'); });