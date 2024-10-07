<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-10-27 15:54:11
 * @LastEditTime: 2022-03-09 10:42:40
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \vue-cesium@next\website\docs\en-US\overlays\vc-overlay-html.md
-->

## VcOverlayHtml

Load HTML element overlays by geographic location.

**Note:** Style file need to be imported: `import 'vue-cesium/dist/index.css';`

### Basic usage

Basic usage of VcOverlayHtml component.

:::demo Use the `vc-overlay-html` tag to add a div tag to the viewer and set up CSS animation.

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer>
    <vc-overlay-html ref="html" :position="[117.186419, 45.66446, 20]">
      <div class="vc-box">aa</div>
    </vc-overlay-html>
    <vc-entity :position="[117.186419, 45.66446, 20]">
      <vc-graphics-point color="red" :pixel-size="8"></vc-graphics-point>
    </vc-entity>
    <vc-overlay-html :position="{ lng: 104.04, lat: 30.40 }">
      <div class="label-container label-container-var">
        <div class="label-animate-marker_border">
          <span class="label-animate-marker_text">Hello World</span>
        </div>
      </div>
    </vc-overlay-html>
    <vc-layer-imagery>
      <vc-imagery-provider-arcgis></vc-imagery-provider-arcgis>
    </vc-layer-imagery>
  </vc-viewer>
  <el-row class="demo-toolbar">
    <el-button type="danger" round @click="unload">Unload</el-button>
    <el-button type="danger" round @click="load">Load</el-button>
    <el-button type="danger" round @click="reload">Reload</el-button>
  </el-row>
</el-row>

<script>
  export default {
    methods: {
      unload() {
        this.$refs.html.unload()
      },
      load() {
        this.$refs.html.load()
      },
      reload() {
        this.$refs.html.reload()
      }
    }
  }
</script>
```

:::

### Props

| Name        | Type          | Default | Description                                                                                    |
| ----------- | ------------- | ------- | ---------------------------------------------------------------------------------------------- |
| show        | boolean       | `true`  | `optional` Specify whether to display the HTML overlay.                                        |
| position    | VcPosition    |         | `optional` Specify the geographic location of the HTML element.                                |
| pixelOffset | VcCartesian2  |         | `optional` Specify the pixel offset of the HTML.                                               |
| autoHidden  | boolean       | `true`  | `optional` Specifies whether HTML is automatically hidden when it is on the back of the earth. |
| customClass | string        |         | `optional` Specify an HTML custom class.                                                       |
| teleport    | TeleportProps |         | `optional` Specify the teleport props.                                                         |

### Events

| Name       | Parameters                              | Description                                            |
| ---------- | --------------------------------------- | ------------------------------------------------------ |
| beforeLoad | (instance: VcComponentInternalInstance) | Triggers before the cesiumObject is loaded.            |
| ready      | (readyObj: VcReadyObject)               | Triggers when the cesiumObject is successfully loaded. |
| destroyed  | (instance: VcComponentInternalInstance) | Triggers when the cesiumObject is destroyed.           |

### Methods

| Name               | Parameters                               | Description                                     |
| ------------------ | ---------------------------------------- | ----------------------------------------------- |
| load               | () => Promise\<false \| VcReadyObject\>  | Load components manually.                       |
| reload             | () => Promise\<false \| VcReadyObject\>  | Reload components manually.                     |
| unload             | () => Promise\<boolean\>                 | Destroy the loaded component manually.          |
| getCreatingPromise | () => Promise\<boolean \| VcReadyObject> | Get the creatingPromise.                        |
| getCesiumObject    | () => VcCesiumObject                     | Get the Cesium object loaded by this component. |

### Reference

- Sandbox: **[HTML Overlays](https://sandcastle.cesium.com/gallery/HTML%20Overlays.html)**
