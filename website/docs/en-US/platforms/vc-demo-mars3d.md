## Mars3D Demo

When vue-cesium uses [Mars3D](http://mars3d.cn/) of Mars Technology, it is only necessary to configure the address of the mars3d main library and its plug-in library through the configuration item `mars3dConfig` when introducing VueCesium, and the default use of unpkg.com cdn resources, if you need to use it locally or in the local area network, please change the resources of the relevant library to the local or local area network address through `mars3dConfig.libs`.Please [Reference](https://github.com/zouyaoji/vue-cesium/blob/dev/packages/components/viewer/src/loadUtil.ts#L17) for non-TS project structure.

```javascript
import { createApp } from 'vue'
import VueCesium from 'vue-cesium'
import 'vue-cesium/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(VueCesium, {
  mars3dConfig: {
    include: 'mars3d'
  }
} as ConfigProviderContext)
app.mount('#app')
```

Or configure `mars3dConfig` on the `vc-viewer` component.

If `vc-viewer` is loaded successfully, it will return { Cesium, viewer, map }, through this `map` use [mars3d tutorial](http://mars3d.cn/doc.html) and [mars3d API](http:// mars3d.cn/api/) for related development, such as the following example:

### Basic usage

Use VueCesium to load Mars Technology Mars3D

:::demo specifies the use of Mars3D through the `mars3dConfig` prop of `vc-viewer`

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer
    ref="vcViewer"
    :mars3d-config="mars3dConfig"
    :animation="animation"
    :timeline="timeline"
    :fullscreenButton="fullscreenButton"
    :fullscreen-element="fullscreenElement"
    @ready="onViewerReady"
    @left-click="onLeftClick"
  >
    <vc-navigation :offset="offset" @compass-evt="onNavigationEvt" :otherOpts="otherOpts" @zoom-evt="onNavigationEvt"></vc-navigation>
    <vc-entity v-model:billboard="billboard" ref="entity" @click="onEntityClick" :position="{lng: 108, lat: 32}" :point="point" :label="label">
      <vc-graphics-billboard ref="billboard" image="https://zouyaoji.top/vue-cesium/favicon.png"></vc-graphics-billboard>
      <vc-graphics-rectangle :coordinates="[130, 20, 80, 25]" material="green"></vc-graphics-rectangle>
    </vc-entity>
    <vc-layer-imagery :sort-order="20">
      <vc-imagery-provider-osm></vc-imagery-provider-osm>
    </vc-layer-imagery>
  </vc-viewer>
  <el-row class="demo-toolbar">
    <el-row>
      <el-button type="danger" round @click="unload">Unload</el-button>
      <el-button type="danger" round @click="load">Load</el-button>
      <el-button type="danger" round @click="reload">Reload</el-button>
    </el-row>
  </el-row>
</el-row>

<script>
  export default {
    data() {
      return {
        animation: true,
        timeline: true,
        fullscreenButton: true,
        fullscreenElement: document.body,
        point: {
          pixelSize: 28,
          color: 'red'
        },
        label: {
          text: 'Hello World',
          pixelOffset: [0, 150]
        },
        billboard: {},
        offset: [10, 25],
        otherOpts: {
          offset: [0, 32],
          position: 'bottom-right'
        },
        mars3dConfig: {
          include: 'mars3d'
        }
      }
    },
    mounted() {
      this.$refs.vcViewer.creatingPromise.then(({ Cesium, viewer }) => {
        console.log('viewer is loaded.')
      })
    },
    methods: {
      onViewerReady({ Cesium, viewer, map }) {
        console.log(map)
      },
      onNavigationEvt(e) {
        console.log(e)
      },
      onEntityClick(e) {
        console.log(e)
      },
      onLeftClick(e) {
        console.log(e)
      },
      load() {
        this.$refs.vcViewer.load().then(e => {
          console.log(e)
        })
      },
      unload() {
        this.$refs.vcViewer.unload().then(e => {
          console.log(e)
        })
      },
      reload() {
        this.$refs.vcViewer.reload().then(e => {
          console.log(e)
        })
      }
    }
  }
</script>
```

:::

### Reference

- Official website: **[mars3d](http://mars3d.cn/examples.html)**
