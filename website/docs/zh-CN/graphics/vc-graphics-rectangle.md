## VcGraphicsRectangle

加载矩形实体，相当于初始化一个 `Cesium.RectangleGraphics` 实例。

**注意：** 需要作为 `vc-entity` 的子组件才能正常加载。

### 基础用法

矩形实体组件的基础用法。

:::demo 使用 `vc-graphics-rectangle` 标签在三维球上添加矩形实体对象。

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer @ready="onViewerReady">
    <vc-entity description="Hello VueCesium" @click="onEntityEvt" @mouseover="onEntityEvt" @mouseout="onEntityEvt">
      <vc-graphics-rectangle
        ref="rectangle1"
        :coordinates="{ west: -180, south: -90, east: 180, north: 90 }"
        :material="[255,0,0,125]"
      ></vc-graphics-rectangle>
    </vc-entity>
    <vc-entity description="Hello VueCesium" @click="onEntityEvt" @mouseover="onEntityEvt" @mouseout="onEntityEvt">
      <vc-graphics-rectangle
        :coordinates="[-110, 30, -100, 40]"
        :material="[0, 255, 0, 125]"
        :rotation="45/180"
        :extrudedHeight="300000.0"
        :height="100000.0"
        :outline="true"
        outlineColor="black"
        ref="rectangle2"
      ></vc-graphics-rectangle>
    </vc-entity>
    <vc-entity description="Hello VueCesium" @click="onEntityEvt" @mouseover="onEntityEvt" @mouseout="onEntityEvt">
      <vc-graphics-rectangle
        :coordinates="{ west: -92.0, south: 30.0, east: -82.0, north: 40.0 }"
        material="https://zouyaoji.top/vue-cesium/favicon.png"
        :rotation="getRotationValue"
        :stRotation="getRotationValue"
        :classificationType="0"
        ref="rectangle3"
      ></vc-graphics-rectangle>
    </vc-entity>
  </vc-viewer>
</el-row>

<script>
  import { ref, getCurrentInstance, onMounted } from 'vue'
  export default {
    setup() {
      // state
      const rectangle1 = ref(null)
      const rectangle2 = ref(null)
      const rectangle3 = ref(null)
      const rotation = ref(0)
      // methods
      const onEntityEvt = e => {
        console.log(e)
      }
      const onViewerReady = cesiumInstance => {
        console.log('viewer ready')
      }
      const getRotationValue = () => {
        rotation.value += 0.005
        return rotation.value
      }
      // life cycle
      onMounted(() => {
        Promise.all([rectangle1.value.creatingPromise, rectangle2.value.creatingPromise, rectangle3.value.creatingPromise]).then(instances => {
          instances[0].viewer.zoomTo(instances[0].viewer.entities)
          window.viewer = instances[0].viewer
        })
      })

      return {
        onEntityEvt,
        rectangle1,
        rectangle2,
        rectangle3,
        onViewerReady,
        getRotationValue
      }
    }
  }
</script>
```

:::

### 属性

<!-- prettier-ignore -->
| 属性名 | 类型 | 默认值 | 描述 | 可选值 |
| ------ | --- | ------ | --- | ----  |
| show | boolean | `true` | `optional` 指定 rectangle 是否显示。 |
| coordinates | VcRectangle\|Array | | `optional` 指定 rectangle 的 Rectangle 属性。 |
| height | number | `0` | `optional` 指定 rectangle 高度。 |
| heightReference | number | | `optional` 指定 rectangle 高度模式。 **NONE: 0, CLAMP_TO_GROUND: 1, RELATIVE_TO_GROUND: 2**|0/1/2|
| extrudedHeight | number | | `optional` 指定 rectangle 拉伸高度。 |
| extrudedHeightReference | number | | `optional` 指定 rectangle 拉伸高度模式。 **NONE: 0, CLAMP_TO_GROUND: 1, RELATIVE_TO_GROUND: 2**|0/1/2|
| rotation | number | `0.0` | `optional` 指定 rectangle 按正北顺时针的旋转角。 |
| stRotation | number | `0.0` | `optional` 指定 rectangle 按正北逆时针旋转纹理。 |
| granularity | number | | `optional` 指定每个经纬度之间的采样粒度。 |
| fill | boolean | `true` | `optional` 指定 rectangle 是否填充材质。 |
| material | VcMaterial\|string\|Array | `'white'` | `optional` 指定 rectangle 材质。 |
| outline | boolean | `false` | `optional` 指定 rectangle 是否绘制轮廓线。 |
| outlineColor | VcColor\|string\|Array | `'black'` | `optional` 指定 rectangle 轮廓线颜色。 |
| outlineWidth | number | `1.0` | `optional` 指定 rectangle 轮廓线宽度。 |
| shadows | number | `0` | `optional` 指定 rectangle 是否投射或接收阴影。 **DISABLED: 0, ENABLED: 1, CAST_ONLY: 2, RECEIVE_ONLY: 3**|0/1/2/3|
| distanceDisplayCondition | VcDistanceDisplayCondition\|Array | | `optional` 指定 rectangle 随相机距离改变是否显示参数。 |
| classificationType | number | `2` | `optional` 指定 rectangle 贴对象模式 。 **TERRAIN: 0, CESIUM_3D_TILE: 1, BOTH: 2**|0/1/2|
| zIndex | number | `0` | `optional` 指定 rectangle 顺序，没设置高度和拉伸高度时有效。 |

### 事件

| 事件名            | 参数                                    | 描述                                     |
| ----------------- | --------------------------------------- | ---------------------------------------- |
| beforeLoad        | (instance: VcComponentInternalInstance) | 对象加载前触发。                         |
| ready             | (readyObj: VcReadyObject)               | 对象加载成功时触发。                     |
| destroyed         | (instance: VcComponentInternalInstance) | 对象销毁时触发。                         |
| definitionChanged |                                         | 每当更改或修改属性或子属性时触发该事件。 |

### 参考

- 官方文档： **[RectangleGraphics](https://cesium.com/docs/cesiumjs-ref-doc/RectangleGraphics.html)**
