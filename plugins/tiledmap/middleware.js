import path from 'path'
import { TiledMap } from './src/TiledMap'

export default function Middleware () {

  return (resource, next) => {
    return next()
    if (resource.children.length > 0) {

      if (!resource.data || resource.type !== PIXI.loaders.Resource.TYPE.XML) {
        return next()
      }

      const route = path.dirname(resource.url.replace(this.baseUrl, ''))
      console.log(resource.data)
      let map = new TiledMap(resource.data, route)
      map.parse()
      resource.data = map
    }
  }

}
