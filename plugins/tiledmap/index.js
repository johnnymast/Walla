import Middleware from './middleware'
import TiledMap from './package/TiledMap'

PIXI.loaders.Loader.addPixiMiddleware(Middleware)
PIXI.loader.use(Middleware.call(PIXI.loader))

export default TiledMap