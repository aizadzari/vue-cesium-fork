## VcDatasourceGeojson

加载 [GeoJSON](https://geojson.org/) 和 [TopoJSON](https://github.com/topojson/topojson) 格式的数据源。相当于初始化一个 `Cesium.GeoJsonDataSource` 实例。

### 基础用法

GeoJson 数据源组件的基础用法。

:::demo 使用 `vc-datasource-geojson` 标签在三维球上添加 GeoJSON 格式数据源对象。

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer>
    <vc-datasource-geojson
      ref="datasourceRef"
      data="https://zouyaoji.top/vue-cesium/SampleData/geojson/china.json"
      @ready="onDatasourceReady"
      :show="show"
      stroke="red"
      @click="onClicked"
      :entities="entities"
    ></vc-datasource-geojson>
    <vc-layer-imagery :sort-order="10">
      <vc-imagery-provider-tianditu
        map-style="img_c"
        :maximum-level="17"
        token="436ce7e50d27eede2f2929307e6b33c0"
        ref="provider"
      ></vc-imagery-provider-tianditu>
    </vc-layer-imagery>
    <vc-terrain-provider-cesium></vc-terrain-provider-cesium>
  </vc-viewer>
  <el-row class="demo-toolbar">
    <el-button type="danger" round @click="unload">销毁</el-button>
    <el-button type="danger" round @click="load">加载</el-button>
    <el-button type="danger" round @click="reload">重载</el-button>
    <el-switch v-model="show" active-color="#13ce66" inactive-text="显示/隐藏"> </el-switch>
  </el-row>
</el-row>

<script>
  import { ref, reactive, getCurrentInstance, onMounted, watch } from 'vue'
  export default {
    setup() {
      // state
      const show = ref(true)
      const datasourceRef = ref(null)
      const entities = reactive([])
      for (let i = 0; i < 1000; i++) {
        entities.push({
          position: [Math.random() * 40 + 85, Math.random() * 30 + 21],
          label: {
            text: i.toString(),
            pixelOffset: { x: 25, y: 20 }
          },
          point: {
            pixelSize: 8,
            outlineWidth: 2,
            color: 'red',
            outlineColor: 'yellow'
          }
        })
      }
      // methods
      const onClicked = e => {
        console.log(e)
      }
      const unload = () => {
        datasourceRef.value.unload()
      }
      const reload = () => {
        datasourceRef.value.reload()
      }
      const load = () => {
        datasourceRef.value.load()
      }
      const onDatasourceReady = ({ Cesium, viewer, cesiumObject }) => {
        viewer.zoomTo(cesiumObject)
      }

      return {
        unload,
        reload,
        load,
        show,
        onClicked,
        onDatasourceReady,
        datasourceRef,
        entities
      }
    }
  }
</script>
```

:::

### 属性

<!-- prettier-ignore -->
| 属性名 | 类型 | 默认值 | 描述 |
| ---------------- | -------------------------------------- | ------- | --------------------------------------------------------------------------------- |
| data | Cesium.Resource \| string \| AnyObject | | `required` 指定要加载的 GeoJSON 或者 TopoJSON 的 url。 |
| show | boolean | `true` | `optional` 指定数据源是否显示。 |
| enableMouseEvent | boolean | `true` | `optional` 指定鼠标事件是否生效。 |
| entities | Array\<[VcEntityProps](https://zouyaoji.top/vue-cesium/#/zh-CN/component/vc-entity)\> | `[]` | `optional` 指定要添加到该数据源的实体集合。 |
| sourceUri | string | | `optional` 指定引用资源 url 的相对路径。 |
| describe | (properties: AnyObject, nameProperty: string) => string \| AnyObject | | `optional` 指定数据源描述信息函数，该函数返回一个字符串，将属性转换为 html 描述。 |
| markerSize | number | `48` | `optional` 指定点对象创建的图钉的像素大小。 |
| markerSymbol | string | | `optional` 指定点对象创建的图钉的风格符号。 |
| markerColor | VcColor | | `optional` 指定点对象创建的图钉的颜色。 |
| stroke | VcColor | | `optional` 指定线、面对象的边框颜色。 |
| strokeWidth | number | `2` | `optional` 指定线、面对象的边框宽度。 |
| fill | VcColor | | `optional` 指定面对象的填充色。 |
| clampToGround | boolean | `false` | `optional` 指定对象是否贴地。 |
| credit | string\|Cesium.Credit | | `optional` 指定数据源描述信息。 |

### 事件

| 事件名            | 参数                                    | 描述                         |
| ----------------- | --------------------------------------- | ---------------------------- |
| beforeLoad        | (instance: VcComponentInternalInstance) | 对象加载前触发。             |
| ready             | (readyObj: VcReadyObject)               | 对象加载成功时触发。         |
| destroyed         | (instance: VcComponentInternalInstance) | 对象销毁时触发。             |
| changedEvent      |                                         | 数据源改变时触发。           |
| errorEvent        |                                         | 数据源发生错误时触发。       |
| loadingEvent      |                                         | 数据源开始或结束加载时触发。 |
| clusterEvent      | (clusteredEntities, cluster)            | 数据源聚合事件。             |
| collectionChanged | (collection, added, removed, changed)   | 数据源实体集合改变时触       |
| mousedown         | (evt: VcPickEvent)                      | 鼠标在该数据源上按下时触发。 |
| mouseup           | (evt: VcPickEvent)                      | 鼠标在该数据源上弹起时触发。 |
| click             | (evt: VcPickEvent)                      | 鼠标单击该数据源时触发。     |
| clickout          | (evt: VcPickEvent)                      | 鼠标单击该数据源外部时触发。 |
| dblclick          | (evt: VcPickEvent)                      | 鼠标左键双击该数据源时触发。 |
| mousemove         | (evt: VcPickEvent)                      | 鼠标在该数据源上移动时触发。 |
| mouseover         | (evt: VcPickEvent)                      | 鼠标移动到该数据源时触发。   |
| mouseout          | (evt: VcPickEvent)                      | 鼠标移出该数据源时触发。     |

### 插槽

| 插槽名  | 描述                                     | 子组件    |
| ------- | ---------------------------------------- | --------- |
| default | 用于 vue-datasource-geojson 挂载子组件。 | vc-entity |

### 参考

- 官方文档： **[GeoJsonDataSource](https://cesium.com/docs/cesiumjs-ref-doc/GeoJsonDataSource.html)**
