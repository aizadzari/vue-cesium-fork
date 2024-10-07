## VcImageryProviderBaidu

Loading a tiled imagery provider that provides tiled imagery hosted by Baidu Map. You can use `projectionTransforms` to transform the coordinates of the tiles.

**Note**: It needs to be a subcomponent of `vc-layer-imagery` to load normally.

### Basic usage

Basic usage of the `vc-imagery-provider-baidu` component.

:::demo Use the `vc-layer-imagery` tag to add a imagery layer provided by Baidu Maps on the viewer.

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer>
    <vc-layer-imagery :alpha="alpha" :brightness="brightness" :contrast="contrast">
      <vc-imagery-provider-baidu
        ref="provider"
        :map-style="mapStyle"
        :projection-transforms="{ form: 'BD09', to: 'WGS84' }"
      ></vc-imagery-provider-baidu>
    </vc-layer-imagery>
  </vc-viewer>
  <div class="demo-toolbar">
    <el-row>
      <el-button type="danger" round @click="unload">Unload</el-button>
      <el-button type="danger" round @click="load">Load</el-button>
      <el-button type="danger" round @click="reload">Reload</el-button>
    </el-row>
    <el-row>
      <el-col>
        <div class="block">
          <span class="demonstration">Alpha</span>
          <el-slider v-model="alpha" :min="0" :max="1" :step="0.01"></el-slider>
          <span class="demonstration">Brightness</span>
          <el-slider v-model="brightness" :min="0" :max="5" :step="0.01"></el-slider>
          <span class="demonstration">Contrast</span>
          <el-slider v-model="contrast" :min="0" :max="5" :step="0.01"></el-slider>
          <span class="demonstration">Swich</span>
          <el-select v-model="mapStyle" placeholder="Select">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
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
      const options = [
        {
          value: 'normal',
          label: 'Normal'
        },
        {
          value: 'vec',
          label: 'vec'
        },
        {
          value: 'img',
          label: 'Image' // not https
        },
        {
          value: 'dark',
          label: 'Dark'
        },
        {
          value: 'midnight',
          label: 'Midnight'
        },
        {
          value: 'traffic',
          label: 'Traffic'
        }
      ]
      const mapStyle = ref('vec')
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
      return {
        provider,
        unload,
        reload,
        load,
        alpha,
        brightness,
        contrast,
        options,
        mapStyle
      }
    }
  }
</script>
```

:::

### Props

<!-- prettier-ignore -->
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| url | string | | `optional` Specify the service address. |
| rectangle | VcRectangle | | `optional` The rectangle of the layer. This parameter is ignored when accessing a tiled layer. |
| credit | string \| Cesium.Credit | `''` | `optional` A credit for the data source, which is displayed on the canvas. |
| minimumLevel | number | `0` | `optional` The minimum level-of-detail supported by the imagery provider. Take care when specifying this that the number of tiles at the minimum level is small, such as four or less. A larger number is likely to result in rendering problems. |
| maximumLevel | number | `18` | `optional` The maximum level-of-detail supported by the imagery provider, or undefined if there is no limit. |
| scale | number | `1` | `optional` Specify the scale. |
| ak | string | `E4805d16520de693a3fe707cdc962045` | `optional` Specify the baidumap key. |
|subdomains|Array\<string\>|`['0', '1', '2', '3']`|`optional` Specify the service polling parameters.|
| mapStyle | 'img' \| 'vec' \| 'traffic' \| 'normal' \| 'light' \| 'dark' \| 'redalert' \| 'googlelite' \| 'grassgreen' \| 'midnight' \| 'pink' \| 'darkgreen' \| 'bluish' \| 'grayscale' \| 'hardedge' | `normal` | `optional` Specify the mapStyle. |img/vec/traffic/normal/light/dark/redalert/googlelite/grassgreen/midnight/pink/darkgreen/bluish/grayscale/hardedge|
| projectionTransforms | ProjectionTransforms |  | `optional` Specify the projection transformation parameters. such as { from: 'BD09', to: 'WGS84' }** |
| protocol | string | `'https'` | `optional` Specify protocol of service. |

:::tip

Tip: In addition to passing `Cesium.Rectangle`, the `rectangle` property can also pass `PlainObject(RectangleInDegreeOption|Cartesian4Option`) and `Array<number>` (degrees)

:::

:::tipflex

```js
// RectangleInDegreeOption
{
  west: number,
  south: number,
  east: number,
  north: number
}
```

```js
// Cartesian4Option
{
  x: number,
  y: number,
  z: number,
  w: number
}
```

```js
// Array<number> in degrees
;[number, number, number, number]
```

:::

### Events

| Name         | Parameters                              | Description                                                          |
| ------------ | --------------------------------------- | -------------------------------------------------------------------- |
| beforeLoad   | (instance: VcComponentInternalInstance) | Triggers before the cesiumObject is loaded.                          |
| ready        | (readyObj: VcReadyObject)               | Triggers when the cesiumObject is successfully loaded.               |
| destroyed    | (instance: VcComponentInternalInstance) | Triggers when the cesiumObject is destroyed.                         |
| errorEvent   | TileProviderError                       | Triggers when the imagery provider encounters an asynchronous error. |
| readyPromise | ImageryProvider                         | Triggers when the provider is ready for use.                         |

### Reference

- **[openlayers#3522](https://github.com/openlayers/openlayers/issues/3522)**
