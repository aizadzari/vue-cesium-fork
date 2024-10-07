## VcDatasourceCustom

加载自定义数据源，相当于初始化一个 `Cesium.CustomDataSource` 实例，手动管理一组实体对象。

### 基础用法

自定义数据源组件的基础用法。

:::demo 使用 `vc-datasource-custom` 标签在三维球上添加几组自定义数据源对象，并做聚合管理。

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer sceneModePicker @ready="onViewerReady">
    <!-- <vc-terrain-provider-cesium></vc-terrain-provider-cesium> -->
    <vc-datasource-custom name="custom" :entities="entities" @click="onClicked" :loading-event="morphComplete" :show="show">
      <vc-entity
        ref="entity1"
        @click="onClicked"
        :position="[108, 35, 100]"
        :billboard="{
          image: 'https://zouyaoji.top/vue-cesium/favicon.png',
          show: true,
          pixelOffset: [0, -20],
          eyeOffset: {x: 0, y: 0, z: 0},
          horizontalOrigin: 0,
          verticalOrigin: 1,
          scale: 0.25,
          color: 'lime'
        }"
        description="Hello VueCesium"
        id="This is a billboard"
      >
      </vc-entity>
      <vc-entity ref="entity2" :position="[105,40,200000]" description="Hello VueCesium">
        <vc-graphics-cylinder
          ref="cylinder1"
          :length="400000.0"
          :top-radius="200000.0"
          :bottom-radius="200000.0"
          :material="[0,255,0,125]"
          :outline="true"
          outline-rolor="#006400"
        ></vc-graphics-cylinder>
      </vc-entity>
      <vc-entity ref="entity3" :position="[105,30,200000]" description="Hello VueCesium">
        <vc-graphics-ellipse
          ref="cylinder1"
          :semiMinorAxis="200000.0"
          :semiMajorAxis="200000.0"
          :material="{fabric: {type: 'VcCircleWave', uniforms: {count: 3 }}}"
        ></vc-graphics-ellipse>
      </vc-entity>
    </vc-datasource-custom>
    <vc-datasource-custom
      @click="onClicked"
      :key="index"
      :show="show"
      :name="datasource.name"
      v-for="(datasource, index) of datasources"
      ref="datasourceRefs"
      :entities="datasource.entities"
      @cluster-event="onDatasourceClusterEvent"
      @ready="onDatasourceReady"
      @mouseover="onMouseover"
      @mouseout="onMouseout"
    >
    </vc-datasource-custom>
    <vc-selection-indicator ref="indicatorRef" @pickEvt="pickEvt"></vc-selection-indicator>
    <!-- 注记层 -->
    <vc-layer-imagery :sort-order="20">
      <vc-imagery-provider-tianditu map-style="cva_c" token="436ce7e50d27eede2f2929307e6b33c0"></vc-imagery-provider-tianditu>
    </vc-layer-imagery>
    <vc-layer-imagery :sort-order="10">
      <vc-imagery-provider-tianditu map-style="img_c" token="436ce7e50d27eede2f2929307e6b33c0" ref="provider"></vc-imagery-provider-tianditu>
    </vc-layer-imagery>
  </vc-viewer>
  <el-row class="demo-toolbar">
    <el-button type="danger" round @click="unload">销毁</el-button>
    <el-button type="danger" round @click="load">加载</el-button>
    <el-button type="danger" round @click="reload">重载</el-button>
    <el-switch v-model="show" active-color="#13ce66" inactive-text="显示/隐藏"> </el-switch>
    <el-switch v-model="clusterSch" active-color="#13ce66" inactive-text="聚合方案1" active-text="聚合方案2"> </el-switch>
  </el-row>
</el-row>

<script>
  import { ref, reactive, getCurrentInstance, onMounted, watch } from 'vue'
  export default {
    setup() {
      // state
      const show = ref(true)
      const datasourceRefs = ref([])
      const datasources = reactive([])
      const entities = reactive([
        {
          position: { lng: 105, lat: 35, height: 200 },
          point: {
            pixelSize: 5,
            color: 'red'
          },
          onMouseover: e => {
            console.log(e)
          },
          onClick: e => {
            console.log(e)
          }
        },
        {
          position: { lng: 105, lat: 36, height: 300 },
          point: {
            pixelSize: 8,
            color: 'yellow'
          }
        },
        {
          position: { lng: 105, lat: 37, height: 400 },
          billboard: {
            image: 'https://zouyaoji.top/vue-cesium/favicon.png',
            scale: 0.25
          }
        },
        {
          position: [113, 28.5, 400],
          ellipse: {
            semiMinorAxis: 20000.0,
            semiMajorAxis: 20000.0,
            material: { fabric: { type: 'VcCircleWave', uniforms: { count: 2, color: 'yellow' } } }
          }
        },
        {
          position: [113, 28.5, 400],
          wall: {
            positions: [112.5, 28, 1000, 113, 28, 1000, 113, 29, 1000, 112.5, 29, 1000, 112.5, 29, 1000],
            material: {
              fabric: {
                type: 'VcLineFlow',
                uniforms: { image: 'https://zouyaoji.top/vue-cesium/images/textures/arrow.png', color: 'yellow', repeat: { x: 30, y: 1 }, speed: 10 }
              }
            }
          }
        }
      ])
      const instance = getCurrentInstance()
      const clusterSch = ref(true)
      let _viewer
      // watch
      watch(clusterSch, () => {
        _viewer.scene.camera.changed.raiseEvent()
      })
      // methods
      const addPoints = (options, flag) => {
        if (flag) {
          Cesium.Resource.fetchJson(options.datauri).then(res => {
            const img = new Image()
            img.src = options.iconOn
            img.onload = () => {
              let datasource = {
                name: options.code,
                clustering: true,
                entities: []
              }
              datasource.entities = res.reduce((pre, cur) => {
                return pre.concat({
                  position: [Number(cur.Longitude), Number(cur.Latitude), 1000],
                  id: cur.id,
                  description: cur.name,
                  billboard: {
                    width: img.width,
                    height: img.height,
                    image: options.iconOn,
                    scale: 0.5
                  },
                  onClick: e => {
                    console.log('asd', e)
                  }
                })
              }, [])

              datasources.push(datasource)
            }
          })
        } else {
          datasources = []
        }
      }
      const onClicked = e => {
        console.log(e)
      }
      const unload = () => {
        datasourceRefs.value.forEach(datasourceRef => {
          datasourceRef.unload()
        })
      }
      const reload = () => {
        datasourceRefs.value.forEach(datasourceRef => {
          datasourceRef.reload()
        })
      }
      const load = () => {
        datasourceRefs.value.forEach(datasourceRef => {
          datasourceRef.load()
        })
      }
      const onViewerReady = ({ Cesium, viewer }) => {
        _viewer = viewer
        window.viewer = viewer
        const options = {
          id: '1001',
          code: '1001',
          name: 'test',
          iconOn: 'https://zouyaoji.top/vue-cesium/SampleData/points/pic.png',
          giscolor: '#fb7228',
          datauri: 'https://zouyaoji.top/vue-cesium/SampleData/points/custom-data.json'
        }
        addPoints(options, true)
      }
      const onDatasourceReady = ({ Cesium, viewer, cesiumObject }) => {
        window.cesiumObject = cesiumObject
        viewer.zoomTo(cesiumObject)
        //开启聚合功能
        cesiumObject.clustering.enabled = true
        cesiumObject.clustering.pixelRange = 30
        cesiumObject.clustering.minimumClusterSize = 3
      }
      const onDatasourceClusterEvent = (clusteredEntities, cluster) => {
        if (clusterSch.value) {
          cluster.billboard.show = !0
          cluster.label.show = !1
          cluster.billboard.id = cluster.label.id
          cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.CENTER
          clusteredEntities.length >= 300
            ? (cluster.billboard.image = 'https://zouyaoji.top/vue-cesium/SampleData/images/cluser/300+.png')
            : clusteredEntities.length >= 150
            ? (cluster.billboard.image = 'https://zouyaoji.top/vue-cesium/SampleData/images/cluser/150+.png')
            : clusteredEntities.length >= 90
            ? (cluster.billboard.image = 'https://zouyaoji.top/vue-cesium/SampleData/images/cluser/90+.png')
            : clusteredEntities.length >= 30
            ? (cluster.billboard.image = 'https://zouyaoji.top/vue-cesium/SampleData/images/cluser/30+.png')
            : clusteredEntities.length > 10
            ? (cluster.billboard.image = 'https://zouyaoji.top/vue-cesium/SampleData/images/cluser/10+.png')
            : (cluster.billboard.image = 'https://zouyaoji.top/vue-cesium/SampleData/images/cluser/' + clusteredEntities.length + '.png')
        } else {
          cluster.label.show = true
          cluster.label.scale = 0.5
          cluster.label.fillColor = Cesium.Color.fromCssColorString('#FFFFFF')
          cluster.label.style = Cesium.LabelStyle.FILL
          cluster.label.font = '30px caption'
          cluster.label.VerticalOrigin = Cesium.VerticalOrigin.BOTTOM
          cluster.label.pixelOffset = new Cesium.Cartesian2(-7, 5)
          cluster.label.disableDepthTestDistance = Number.POSITIVE_INFINITY
          cluster.point.show = true
          //聚合体属性
          cluster.point.id = cluster.label.id
          cluster.point.color = Cesium.Color.LIGHTSLATEGRAY
          if (clusteredEntities.length >= 100) {
            cluster.point.pixelSize = 38
            cluster.label.pixelOffset = new Cesium.Cartesian2(-12, 5)
          } else if (clusteredEntities.length >= 50) {
            cluster.point.pixelSize = 36
          } else if (clusteredEntities.length >= 40) {
            cluster.point.pixelSize = 33
          } else if (clusteredEntities.length >= 30) {
            cluster.point.pixelSize = 28
          } else if (clusteredEntities.length >= 20) {
            cluster.point.pixelSize = 25
          } else if (clusteredEntities.length >= 10) {
            cluster.label.pixelOffset = new Cesium.Cartesian2(-6, 4)
            cluster.label.scale = 0.4
            cluster.point.pixelSize = 20
          } else if (clusteredEntities.length >= 5) {
            cluster.label.pixelOffset = new Cesium.Cartesian2(-3, 4)
            cluster.label.scale = 0.4
            cluster.point.pixelSize = 15
          } else {
            cluster.label.pixelOffset = new Cesium.Cartesian2(-3, 4)
            cluster.label.scale = 0.4
            cluster.point.pixelSize = 13
          }
        }
      }
      // life cycle
      onMounted(() => {})
      const morphComplete = (a, b, c, d) => {
        console.log(a, b, c, d)
      }
      const pickEvt = e => {
        window.picked = e
        console.log(e)
      }
      const onMouseover = e => {
        console.log('onMouseover', e)
      }
      const onMouseout = e => {
        console.log('onMouseout', e)
      }
      const indicatorRef = ref(null)
      window.indicatorRef = indicatorRef
      return {
        unload,
        reload,
        load,
        show,
        onClicked,
        onViewerReady,
        onDatasourceReady,
        onDatasourceClusterEvent,
        datasourceRefs,
        datasources,
        entities,
        clusterSch,
        morphComplete,
        pickEvt,
        indicatorRef,
        onMouseover,
        onMouseout
      }
    }
  }
</script>
```

:::

### 属性

| 属性名           | 类型                   | 默认值  | 描述                                        |
| ---------------- | ---------------------- | ------- | ------------------------------------------- |
| name             | string                 |         | `optional` 指定数据源名称。                 |
| enableMouseEvent | boolean                | `true`  | `optional` 指定鼠标事件是否生效。           |
| show             | boolean                | `true`  | `optional` 指定数据源是否显示。             |
| entities         | Array<\VcEntityProps\> | `[]`    | `optional` 指定要添加到该数据源的实体集合。 |
| destroy          | boolean                | `false` | `optional` 指定数据源在移除时是否销毁。     |

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

### 方法

| 方法名             | 参数                                     | 描述                                        |
| ------------------ | ---------------------------------------- | ------------------------------------------- |
| load               | () => Promise\<false \| VcReadyObject\>  | 手动加载组件。                              |
| reload             | () => Promise\<false \| VcReadyObject\>  | 手动重新加载组件。                          |
| unload             | () => Promise\<boolean\>                 | 手动卸载组件。                              |
| getCreatingPromise | () => Promise\<boolean \| VcReadyObject> | 获取标志该组件是否创建成功的 Promise 对象。 |
| getCesiumObject    | () => VcCesiumObject                     | 获取该组件加载的 Cesium 对象。              |

### 插槽

| 插槽名  | 描述                                    | 子组件    |
| ------- | --------------------------------------- | --------- |
| default | 用于 vue-datasource-custom 挂载子组件。 | vc-entity |

### 参考

- 官方文档： **[CustomDataSource](https://cesium.com/docs/cesiumjs-ref-doc/CustomDataSource.html)**
