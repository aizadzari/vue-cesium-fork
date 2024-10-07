<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-04-29 16:12:05
 * @LastEditTime: 2023-07-27 22:11:33
 * @LastEditors: zouyaoji 370681295@qq.com
 * @Description:
 * @FilePath: \vue-cesium@next\website\docs\en-US\providers\vc-terrain-provider-arcgis.md
-->

## VcTerrainProviderArcgis

Loading a terrain provider that produces terrain geometry by tessellating height maps retrieved from Elevation Tiles of an ArcGIS ImageService. It is equivalent to initializing a `Cesium.ArcGISTiledElevationTerrainProvider` instance.

### Basic usage

Basic usage of the `vc-terrain-provider-arcgis` component.

:::demo Use the `vc-terrain-provider-arcgis` tag to add the online terrain tile provided by an ArcGIS ImageService.

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer @ready="onViewerReady" :imageryProvider="imageryProvider">
    <vc-terrain-provider-arcgis ref="provider"></vc-terrain-provider-arcgis>
  </vc-viewer>
  <div class="demo-toolbar">
    <el-row>
      <el-button type="danger" round @click="unload">Unload</el-button>
      <el-button type="danger" round @click="load">Load</el-button>
      <el-button type="danger" round @click="reload">Reload</el-button>
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
      const imageryProvider = ref(null)
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
      const onViewerReady = async ({ Cesium, viewer }) => {
        imageryProvider.value = await Cesium.ArcGisMapServerImageryProvider.fromUrl(
          'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        )
        var target = new Cesium.Cartesian3(300770.50872389384, 5634912.131394585, 2978152.2865545116)
        var offset = new Cesium.Cartesian3(6344.974098678562, -793.3419798081741, 2499.9508860763162)
        viewer.camera.lookAt(target, offset)
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
      }
      return {
        provider,
        unload,
        reload,
        load,
        imageryProvider,
        onViewerReady
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
| url | string \| Cesium.Resource | `'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer'` | `required` The URL of the ArcGIS ImageServer service. |
| token | string | | `optional` The authorization token to use to connect to the service. |
| ellipsoid | Cesium.Ellipsoid | | `optional` The ellipsoid. If the tilingScheme is specified, this parameter is ignored and the tiling scheme's ellipsoid is used instead. If neither parameter is specified, the WGS84 ellipsoid is used.|

### Events

| Name         | Parameters                              | Description                                                           |
| ------------ | --------------------------------------- | --------------------------------------------------------------------- |
| beforeLoad   | (instance: VcComponentInternalInstance) | Triggers before the VcTerrainProviderArcgis is loaded.                |
| ready        | (readyObj: VcReadyObject)               | Triggers when the VcTerrainProviderArcgis is successfully loaded.     |
| destroyed    | (instance: VcComponentInternalInstance) | Triggers when the VcTerrainProviderArcgis is destroyed.               |
| errorEvent   | (evt: Cesium.TileProviderError)         | Triggers when the terrrain provider encounters an asynchronous error. |
| readyPromise | (evt: boolean)                          | Triggers when the provider is ready for use.                          |

### Reference

- Refer to the official documentation: **[ArcGISTiledElevationTerrainProvider](https://cesium.com/docs/cesiumjs-ref-doc/ArcGISTiledElevationTerrainProvider.html)**
