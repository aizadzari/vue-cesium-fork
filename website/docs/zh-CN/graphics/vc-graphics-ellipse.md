## VcGraphicsEllipse

加载圆柱、圆锥、圆台实体，相当于初始化一个 `Cesium.EllipseGraphics` 实例。

**注意：** 需要作为 `vc-entity` 的子组件才能正常加载。

### 基础用法

椭圆实体组件的基础用法。

:::demo 使用 `vc-graphics-ellipse` 标签在三维球上添加圆柱和圆锥体。

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer @ready="onViewerReady">
    <vc-entity
      ref="entity1"
      :position="[111, 40, 150000]"
      description="Hello VueCesium"
      @click="onEntityEvt"
      @mouseover="onEntityEvt"
      @mouseout="onEntityEvt"
    >
      <vc-graphics-ellipse
        :semiMinorAxis="300000.0"
        :semiMajorAxis="300000.0"
        :height="200000.0"
        material="green"
        :outline="true"
      ></vc-graphics-ellipse>
    </vc-entity>
    <vc-entity ref="entity2" :position="[103, 40]" description="Hello VueCesium">
      <vc-graphics-ellipse :semiMinorAxis="250000.0" :semiMajorAxis="400000.0" :material="[255, 0, 0, 125]"></vc-graphics-ellipse>
    </vc-entity>
    <vc-entity ref="entity3" :position="[95, 40, 100000]" description="Hello VueCesium">
      <vc-graphics-ellipse
        :semiMinorAxis="150000.0"
        :semiMajorAxis="300000.0"
        :extrudedHeight="200000.0"
        :rotation="45/180"
        :material="[0, 0, 255, 125]"
        :outline="true"
      ></vc-graphics-ellipse>
    </vc-entity>
  </vc-viewer>
</el-row>

<script>
  import { ref, getCurrentInstance, onMounted } from 'vue'
  export default {
    setup() {
      // state
      const entity1 = ref(null)
      const entity2 = ref(null)
      const entity3 = ref(null)
      // methods
      const onEntityEvt = e => {
        console.log(e)
      }
      const onViewerReady = cesiumInstance => {
        console.log('viewer ready')
      }
      // life cycle
      onMounted(() => {
        Promise.all([entity1.value.creatingPromise, entity2.value.creatingPromise, entity3.value.creatingPromise]).then(instances => {
          instances[0].viewer.zoomTo(instances[0].viewer.entities)
        })
      })

      return {
        onEntityEvt,
        entity1,
        entity2,
        entity3,
        onViewerReady
      }
    }
  }
</script>
```

:::

### 属性

<!-- prettier-ignore -->
| 属性名 | 类型 | 默认值 | 描述 | 可选值 |
| ----- | ------ | ---- | ----- | ---- |
| show | boolean | `true` | `optional` 指定 ellipse 是否显示。 |
| semiMajorAxis | number | | `optional` 指定 ellipse 长半轴。 |
| semiMinorAxis | number | | `optional` 指定 ellipse 短半轴。 |
| height | number | `0` | `optional` 指定 ellipse 高度。 |
| heightReference | number | | `optional` 指定 ellipse 高度模式。 **NONE: 0, CLAMP_TO_GROUND: 1, RELATIVE_TO_GROUND: 2**|0/1/2|
| extrudedHeight | number | | `optional` 指定 ellipse 拉伸高度。 |
| extrudedHeightReference | number | | `optional` 指定 ellipse 拉伸高度模式。 **NONE: 0, CLAMP_TO_GROUND: 1, RELATIVE_TO_GROUND: 2**|0/1/2|
| rotation | number | `0.0` | `optional` 指定 ellipse 正北逆时针旋转角度。 |
| stRotation | number | `0.0` | `optional` 指定 ellipse 纹理正北逆时针旋转角度。 |
| granularity | number | | `optional` 指定每个经纬度之间的采样粒度。 |
| fill | boolean | `true` | `optional` 指定 ellipse 是否填充材质。 |
| material | VcMaterial\|string\|Array | `'white'` | `optional` 指定 ellipse 材质。 |
| outline | boolean | `false` | `optional` 指定 ellipse 是否绘制轮廓线。 |
| outlineColor | VcColor\|string\|Array | `'black'` | `optional` 指定 ellipse 轮廓线颜色。 |
| outlineWidth | number | `1.0` | `optional` 指定 ellipse 轮廓线宽度。 |
| numberOfVerticalLines | number | `16` | `optional` 指定 ellipse 沿轮廓周长绘制的垂直线数。 |
| shadows | number | `0` | `optional` 指定 ellipse 是否投射接收每一个光源的阴影。 **DISABLED: 0, ENABLED: 1, CAST_ONLY: 2, RECEIVE_ONLY: 3**|0/1/2/3|
| distanceDisplayCondition | VcDistanceDisplayCondition\|Array | | `optional` 指定 ellipse 随相机距离的显示条件。 |
| classificationType | number | `2` | `optional` 指定 ellipse 的贴地模式。 **TERRAIN: 0, CESIUM_3D_TILE: 1, BOTH: 2**|0/1/2|
| zIndex | number | | `optional` 指定 ellipse 顺序，没有高度和拉伸高度才有效。 |

### 事件

| 事件名            | 参数                                    | 描述                                     |
| ----------------- | --------------------------------------- | ---------------------------------------- |
| beforeLoad        | (instance: VcComponentInternalInstance) | 对象加载前触发。                         |
| ready             | (readyObj: VcReadyObject)               | 对象加载成功时触发。                     |
| destroyed         | (instance: VcComponentInternalInstance) | 对象销毁时触发。                         |
| definitionChanged |                                         | 每当更改或修改属性或子属性时触发该事件。 |

### 参考

- 官方文档： **[EllipseGraphics](https://cesium.com/docs/cesiumjs-ref-doc/EllipseGraphics.html)**
