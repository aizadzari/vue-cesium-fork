## VcGraphicsBillboard

加载布告板实体，相当于初始化一个 `Cesium.BillboardGraphics` 实例。

**注意：** 需要作为 `vc-entity` 的子组件挂载才能正常加载。

### 基础用法

布告板组件的基础用法。

:::demo 使用 `vc-graphics-billboard` 标签在三维球上添加实体布告板。

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer>
    <!-- 通过属性加载 和 子组件分别加载 -->
    <vc-entity ref="entity" :position="position" @click="onEntityEvt" @mouseover="onEntityEvt" @mouseout="onEntityEvt">
      <vc-graphics-billboard
        ref="billboard"
        :image="image"
        :scale="scale"
        :show="show"
        :distance-display-condition="distanceDisplayCondition"
        :horizontal-origin="horizontalOrigin"
      ></vc-graphics-billboard>
    </vc-entity>
  </vc-viewer>
  <el-row class="demo-toolbar">
    <el-button type="danger" round @click="unload">销毁</el-button>
    <el-button type="danger" round @click="load">加载</el-button>
    <el-button type="danger" round @click="reload">重载</el-button>
    <el-switch v-model="show" active-color="#13ce66" inactive-text="显示/隐藏"> </el-switch>
  </el-row>
</el-row>

<script>
  import { ref, getCurrentInstance, onMounted } from 'vue'
  export default {
    setup() {
      // state
      const image = 'https://zouyaoji.top/vue-cesium/favicon.png'
      const position = { lng: 90, lat: 40, height: 10000 } // [90, 40, 10000]
      const distanceDisplayCondition = { near: 0, far: 20000000 }
      const horizontalOrigin = 0
      const scale = ref(0.25)
      const show = ref(true)
      const entity = ref(null)
      const billboard = ref(null)
      // methods
      const onEntityEvt = e => {
        console.log(e)
        if (e.type === 'onmouseover') {
          scale.value = 0.5
        } else if (e.type === 'onmouseout') {
          scale.value = 0.25
        }
      }
      const unload = () => {
        billboard.value.unload()
      }
      const reload = () => {
        billboard.value.reload()
      }
      const load = () => {
        billboard.value.load()
      }
      // life cycle
      onMounted(() => {
        entity.value.creatingPromise.then(({ Cesium, viewer, cesiumObject }) => {
          viewer.zoomTo(cesiumObject)
        })
      })

      return {
        image,
        position,
        distanceDisplayCondition,
        horizontalOrigin,
        scale,
        show,
        onEntityEvt,
        unload,
        reload,
        load,
        billboard,
        entity
      }
    }
  }
</script>
```

:::

### 属性

<!-- prettier-ignore -->
| 属性名 | 类型 | 默认值 | 描述 | 可选值 |
| ------ |---- | ------ | ----- | ---- |
| show | boolean | `true` | `optional` 指定 billboard 是否显示。 |
| image | string \| HTMLCanvasElement \|Cesium.CallbackProperty \| VcCallbackPropertyFunction\<string\>| | `optional` 指定 billboard 加载的的 Image、 URI 或者 Canvas。 |
| scale | number \| Cesium.CallbackProperty \| VcCallbackPropertyFunction\<number\> | `1.0` | `optional` 指定 billboard 图片的缩放比例。 |
| pixelOffset | VcCartesian2 | `{x: 0, y: 0}` | `optional` 指定 billboard 像素偏移。 |
| eyeOffset | VcPosition | `{x: 0, y: 0, z: 0}` | `optional` 指定 billboard 视角偏移。 |
| horizontalOrigin | number \| Cesium.HorizontalOrigin \| VcCallbackPropertyFunction\<number\> | `0` | `optional` 指定 billboard 水平对齐方式。 **CENTER: 0, LEFT: 1, RIGHT: -1** |0/1/-1|
| verticalOrigin | number \| Cesium.VerticalOrigin \| VcCallbackPropertyFunction\<number\> | `0` | `optional` 指定 billboard 垂直对齐方式。**CENTER: 0, BOTTOM: 1, BASELINE: 2, TOP: -1** |0/1/2/-1|
| heightReference | number \| Cesium.HeightReference \| VcCallbackPropertyFunction\<number\> | `0` | `optional` 指定 billboard 高度模式。**NONE: 0, CLAMP_TO_GROUND: 1, RELATIVE_TO_GROUND: 2** |0/1/2|
| color | VcColor | `'white'` | `optional` 指定 billboard 图片的颜色。 |
| rotation | number \| Cesium.CallbackProperty \| VcCallbackPropertyFunction\<number\> | `0` | `optional` 指定 billboard 沿 x 轴方向旋转的角度。 |
| alignedAxis | VcPosition | `{x: 0, y: 0, z: 0}` | `optional` 指定 billboard 按单位矢量轴旋转参数。 |
| sizeInMeters | boolean \| Cesium.CallbackProperty \| VcCallbackPropertyFunction\<boolean\> | | `optional` 指定 billboard 的单位是否是米。 |
| width | number \| Cesium.CallbackProperty \| VcCallbackPropertyFunction\<number\> | | `optional` 指定 billboard 的宽度（像素）。 |
| height | number \| Cesium.CallbackProperty \| VcCallbackPropertyFunction\<number\> | | `optional` 指定 billboard 的高度（像素）。 |
| scaleByDistance | VcNearFarScalar | | `optional` 指定 billboard 随相机距离缩放的参数。 |
| translucencyByDistance | VcNearFarScalar | | `optional` 指定 billboard 随相机距离透明度改变的参数。 |
| pixelOffsetScaleByDistance | VcNearFarScalar | | `optional` 指定 billboard 随相机距离像素偏移改变的参数。 |
| imageSubRegion | VcBoundingRectangle | | `optional` 指定 billboard 的子区域，相对于左下角。 |
| distanceDisplayCondition | VcDistanceDisplayCondition | | `optional` 指定 billboard 随相机距离改变是否显示参数。 |
| disableDepthTestDistance | number \| Cesium.CallbackProperty \| VcCallbackPropertyFunction\<number\> | | `optional` 指定 billboard 深度检测距离。 |

### 事件

| 事件名            | 参数                                    | 描述                                     |
| ----------------- | --------------------------------------- | ---------------------------------------- |
| beforeLoad        | (instance: VcComponentInternalInstance) | 对象加载前触发。                         |
| ready             | (readyObj: VcReadyObject)               | 对象加载成功时触发。                     |
| destroyed         | (instance: VcComponentInternalInstance) | 对象销毁时触发。                         |
| definitionChanged | (property: Cesium.Property)             | 每当更改或修改属性或子属性时触发该事件。 |

### 参考

- 官方文档： **[BillboardGraphics](https://cesium.com/docs/cesiumjs-ref-doc/BillboardGraphics.html)**
