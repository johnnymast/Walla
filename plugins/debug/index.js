const pkg = require('./../deps')

module.exports = {
  DebugManager: require('./manager/DebugManager'),
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