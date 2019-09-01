import path from 'path'
import { TiledMap } from './package/TiledMap'

export default function Middleware () {

  return function(resource, next) {
    //if (resource.children.length > 0) {

      if (!resource.data || resource.type !== PIXI.loaders.Resource.TYPE.XML) {
        return next()
      }

      const domparser = new DOMParser();

      this.data = domparser.parseFromString(resource.xhr.responseText, 'text/xml');

      const route = path.dirname(resource.url.replace(this.baseUrl, ''))
      console.log('parsed', typeof this.data )
      let map = new TiledMap(resource.data, route)
      map.parse()
      resource.data = map
   // }
  }
}
