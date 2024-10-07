## VcImageryProviderWms

用于加载 WMS 标准影像服务，相当于初始化一个 `Cesium.WebMapServiceImageryProvider` 实例。

**注意**：需要作为 `vc-layer-imagery` 的子组件才能正常加载。

### 基础用法

`vc-imagery-provider-wms` 组件的基础用法。

:::demo 使用 `vc-layer-imagery` 标签在三维球上添加由 Cesium Ion REST API 提供的影像瓦片服务图层。

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer @ready="onViewerReady">
    <vc-layer-imagery :alpha="alpha" :brightness="brightness" :contrast="contrast">
      <vc-imagery-provider-wms
        ref="provider"
        url="https://nationalmap.gov.au/proxy/http://geoserver.nationalmap.nicta.com.au/geotopo_250k/ows"
        layers="Hydrography:bores"
        :parameters="{transparent: true, format: 'image/png'}"
      ></vc-imagery-provider-wms>
    </vc-layer-imagery>
  </vc-viewer>
  <div class="demo-toolbar">
    <el-row>
      <el-button type="danger" round @click="unload">销毁</el-button>
      <el-button type="danger" round @click="load">加载</el-button>
      <el-button type="danger" round @click="reload">重载</el-button>
    </el-row>
    <el-row>
      <el-col>
        <div class="block">
          <span class="demonstration">透明度</span>
          <el-slider v-model="alpha" :min="0" :max="1" :step="0.01"></el-slider>
          <span class="demonstration">亮度</span>
          <el-slider v-model="brightness" :min="0" :max="5" :step="0.01"></el-slider>
          <span class="demonstration">对比度</span>
          <el-slider v-model="contrast" :min="0" :max="5" :step="0.01"></el-slider>
        </div>
      </el-col>
    </el-row>
  </div>
</el-row>

<script>
  import { ref, getCurrentInstance } from 'vue'
  export default {
    setup() {
      // state
      const instance = getCurrentInstance()
      const provider = ref(null)
      const alpha = ref(1)
      const brightness = ref(1)
      const contrast = ref(1)
      let viewer = undefined
      // methods
      const unload = () => {
        provider.value.unload()
      }
      const reload = () => {
        provider.value.reload()
      }
      const load = () => {
        provider.value.load()
      }
      const onViewerReady = cesiumInstance => {
        cesiumInstance.viewer.camera.setView({
          destination: Cesium.Rectangle.fromDegrees(114.591, -45.837, 148.97, -5.73)
        })
      }
      return {
        provider,
        unload,
        reload,
        load,
        alpha,
        brightness,
        contrast,
        onViewerReady
      }
    }
  }
</script>
```

:::

### 属性

| 属性名                   | 类型            | 默认值  | 描述                                                                               |
| ------------------------ | --------------- | ------- | ---------------------------------------------------------------------------------- |
| url                      | string\|Cesium.Resource  |         | `required` 指定 WMS 服务地址。                                                     |
| layers                   | string          |         | `required` 指定服务图层，多个图层用","隔开。                                       |
| parameters | any          |         | `optional` 在 GetMap URL 中传递给 WMS 服务器的其他参数。                           |
| getFeatureInfoParameters | any          |         | `optional` 在 GetFeatureInfo URL 中传递给 WMS 服务器的其他参数。                   |
| enablePickFeatures       | boolean         | `true`  | `optional` 指定是否支持拾取对象，通过 GetFeatureInfo 获取，需要服务支持。          |
| getFeatureInfoFormats    | Array           |         | `optional` 指定 WMS GetFeatureInfo 请求的格式。                                    |
| rectangle | VcRectangle\|Array   |         | `optional` 指定 WMS 图层矩形范围。                                                 |
| tilingScheme | Cesium.GeographicTilingScheme \| Cesium.WebMercatorTilingScheme          |         | `optional` 指定 WMS 服务瓦片投影参数。                                             |
| ellipsoid      | Cesium.Ellipsoid          |         | `optional` 指定 WMS 服务椭球体参数，如果指定了 tilingScheme 此属性无效。           |
| tileWidth                | number          | `256`   | `optional` 指定像元宽度。                                                          |
| tileHeight               | number          | `256`   | `optional` 指定像元高度。                                                          |
| minimumLevel             | number          | `0`     | `optional` 指定图层可以显示的最小层级。                                            |
| maximumLevel             | number          |         | `optional` 指定图层可以显示的最大层级，undefined 表示没有限制。                    |
| crs                      | string          |         | `optional` 指定 CRS 规范，用于 WMS 规范> = 1.3.0。                                 |
| srs                      | string          |         | `optional` 指定 SRS 规范，用于 WMS 规范 1.1.0 或 1.1.1                             |
| credit                   | Credit\| string |         | `optional` 指定服务描述信息。                                                      |
| subdomains               | string\| Array  | `'abc'` | `optional` 指定服务子域 。                                                         |
| clock | Cesium.Clock          |         | `optional` 确定时间维度的值时使用的 Clock 实例。 当指定 options.times 时是必需的。 |
| times | Cesium.TimeIntervalCollection          |         | `optional` TimeIntervalCollection 及其数据属性是一个包含时间动态维度及其值的对象。 |

### 事件

| 事件名       | 参数                                    | 描述                                                              |
| ------------ | --------------------------------------- | ----------------------------------------------------------------- |
| beforeLoad   | (instance: VcComponentInternalInstance) | 对象加载前触发。                                                  |
| ready        | (readyObj: VcReadyObject)               | 对象加载成功时触发。                                              |
| destroyed    | (instance: VcComponentInternalInstance) | 对象销毁时触发。                                                  |
| errorEvent   | TileProviderError                       | 当图层提供者发生异步错误时触发, 返回一个 TileProviderError 实例。 |
| readyPromise | ImageryProvider                         | 当图层提供者可用时触发, 返回 ImageryProvider 实例。               |

### 参考

- 官方文档： **[WebMapServiceImageryProvider](https://cesium.com/docs/cesiumjs-ref-doc/WebMapServiceImageryProvider.html)**
