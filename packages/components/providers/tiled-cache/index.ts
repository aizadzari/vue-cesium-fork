import { createCommentVNode, defineComponent, getCurrentInstance, PropType } from 'vue'
import type { VcComponentInternalInstance, VcComponentPublicInstance, VcReadyObject, VcRectangle } from '@vue-cesium/utils/types'
import { useProviders } from '@vue-cesium/composables'
import {
  url,
  format,
  credit,
  minimumLevel,
  maximumLevel,
  rectangle,
  tilingScheme,
  ellipsoid,
  tileWidth,
  tileHeight
} from '@vue-cesium/utils/cesium-props'
import { kebabCase } from '@vue-cesium/utils/util'
import { providerEmits } from '@vue-cesium/utils/emits'

export const tiledcacheImageryProviderProps = {
  ...url,
  ...format,
  ...credit,
  ...minimumLevel,
  ...maximumLevel,
  ...rectangle,
  ...tilingScheme,
  ...ellipsoid,
  ...tileWidth,
  ...tileHeight,
  dir: {
    type: String,
    reqiured: true
  },
  scales: {
    type: Array as PropType<Array<number>>,
    default: () => {
      return [
        1 / 295829355,
        1 / 147914678,
        1 / 73957339,
        1 / 36978669,
        1 / 18489335,
        1 / 9244667,
        1 / 4622334,
        1 / 2311167,
        1 / 1155583,
        1 / 577792,
        1 / 288896,
        1 / 144448,
        1 / 72224,
        1 / 36112,
        1 / 18056,
        1 / 9026,
        1 / 4514
      ]
    }
  }
}
export default defineComponent({
  name: 'VcImageryProviderTiledcache',
  props: tiledcacheImageryProviderProps,
  emits: providerEmits,
  setup(props, ctx) {
    // state
    const instance = getCurrentInstance() as VcComponentInternalInstance
    instance.cesiumClass = 'UrlTemplateImageryProvider'
    const providersState = useProviders(props, ctx, instance)
    if (undefined === providersState) {
      return
    }
    // methods
    instance.createCesiumObject = async () => {
      const options = providersState.transformProps(props)
      const { Credit, defined, defaultValue, DeveloperError, Ellipsoid, GeographicTilingScheme, Rectangle, Resource, UrlTemplateImageryProvider } =
        Cesium

      const { url, dir, format } = options
      if (!defined(url)) {
        throw new DeveloperError('options.url is required.')
      }
      if (!defined(dir)) {
        throw new DeveloperError('options.dir is required.')
      }
      const resource = (Resource as any).createIfNeeded(url)
      resource.url += `?dir=${dir}&scale={scale}&col={x}&row={y}&format=${format}`

      const tilingScheme = defaultValue(
        options.tilingScheme,
        new GeographicTilingScheme({
          ellipsoid: defaultValue(options.ellipsoid, Ellipsoid.WGS84),
          numberOfLevelZeroTilesX: 2,
          numberOfLevelZeroTilesY: 1
        })
      )
      const tileWidth = defaultValue(options.tileWidth, 256)
      const tileHeight = defaultValue(options.tileHeight, 256)
      const maximumLevel = options.maximumLevel
      const minimumLevel = defaultValue(options.minimumLevel, 0)
      const rectangle = defaultValue(options.rectangle, tilingScheme.rectangle)
      // Check the number of tiles at the minimum level.  If it's more than four,
      // throw an exception, because starting at the higher minimum
      // level will cause too many tiles to be downloaded and rendered.
      const swTile = tilingScheme.positionToTileXY(Rectangle.southwest(rectangle), minimumLevel)
      const neTile = tilingScheme.positionToTileXY(Rectangle.northeast(rectangle), minimumLevel)
      const tileCount = (Math.abs(neTile.x - swTile.x) + 1) * (Math.abs(neTile.y - swTile.y) + 1)

      if (tileCount > 4) {
        throw new DeveloperError(
          'The rectangle and minimumLevel indicate that there are ' +
            tileCount +
            ' tiles at the minimum level. Imagery providers with more than four tiles at the minimum level are not supported.'
        )
      }

      let credit = defaultValue(options.credit, '')
      if (typeof credit === 'string') {
        credit = new Credit(credit)
      }

      return new UrlTemplateImageryProvider({
        url: resource,
        credit: credit,
        tilingScheme: tilingScheme,
        tileWidth: tileWidth,
        tileHeight: tileHeight,
        minimumLevel: minimumLevel,
        maximumLevel: maximumLevel,
        rectangle: rectangle,
        customTags: {
          scale: (imageryProvider, x, y, level) => {
            const s = 1 / props.scales[level]
            return padWithZerosIfNecessary(imageryProvider, '{scale}', s)
          }
        }
      })
    }

    const padWithZerosIfNecessary = (imageryProvider, key, value) => {
      if (
        imageryProvider &&
        imageryProvider.urlSchemeZeroPadding &&
        Object.prototype.hasOwnProperty.call(imageryProvider.urlSchemeZeroPadding, key)
      ) {
        const paddingTemplate = imageryProvider.urlSchemeZeroPadding[key]
        if (typeof paddingTemplate === 'string') {
          const paddingTemplateWidth = paddingTemplate.length
          if (paddingTemplateWidth > 1) {
            value = value.length >= paddingTemplateWidth ? value : new Array(paddingTemplateWidth - value.toString().length + 1).join('0') + value
          }
        }
      }
      return value
    }
    return () => createCommentVNode(kebabCase(instance.proxy?.$options.name || ''))
  }
})

export type VcImageryProviderTiledcacheProps = {
  /**
   * Path to image tiles on server.
   * Default value: '.'
   */
  url?: string | Cesium.Resource | Promise<string> | Promise<Cesium.Resource>
  /**
   * Default value: 'png'
   */
  format?: string
  /**
   * A credit for the data source, which is displayed on the canvas.
   * Default value: ''
   */
  credit?: string | Cesium.Credit
  /**
   * The minimum level-of-detail supported by the imagery provider. Take care when specifying this that the number of tiles at the minimum level is small, such as four or less. A larger number is likely to result in rendering problems.
   * Default value: 0
   */
  minimumLevel?: number
  /**
   * The maximum level-of-detail supported by the imagery provider, or undefined if there is no limit.
   */
  maximumLevel?: number
  /**
   * The rectangle, in radians, covered by the image.
   */
  rectangle?: VcRectangle
  /**
   * The tiling scheme to use to divide the world into tiles. This parameter is ignored when accessing a tiled server.
   */
  tilingScheme?: Cesium.GeographicTilingScheme | Cesium.WebMercatorTilingScheme
  /**
   * The ellipsoid. If the tilingScheme is specified and used, this parameter is ignored and the tiling scheme's ellipsoid is used instead. If neither parameter is specified, the WGS84 ellipsoid is used.
   */
  ellipsoid?: Cesium.Ellipsoid
  /**
   * The width of each tile in pixels. This parameter is ignored when accessing a tiled server.
   * Default value: 256
   */
  tileWidth?: number
  /**
   * The height of each tile in pixels. This parameter is ignored when accessing a tiled server.
   * Default value: 256
   */
  tileHeight?: number
  /**
   * Triggers before the VcImageryProviderTiledcache is loaded.
   */
  onBeforeLoad?: (instance: VcComponentInternalInstance) => void
  /**
   * Triggers when the VcImageryProviderTiledcache is successfully loaded.
   */
  onReady?: (readyObject: VcReadyObject) => void
  /**
   * Triggers when the component load failed.
   */
  onUnready?: (e: any) => void
  /**
   * Triggers when the VcImageryProviderTiledcache is destroyed.
   */
  onDestroyed?: (instance: VcComponentInternalInstance) => void
  /**
   * Triggers when the imagery provider encounters an asynchronous error.
   */
  onErrorEvent?: (evt: Cesium.TileProviderError) => void
  /**
   * Triggers when the provider is ready for use.
   */
  onReadyPromise?: (evt: boolean, viewer: Cesium.Viewer, instance: VcComponentPublicInstance) => void
}

export type VcImageryProviderTiledcacheRef = VcComponentPublicInstance<VcImageryProviderTiledcacheProps>
