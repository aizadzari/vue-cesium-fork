## VcCollectionPrimitive

Loading a collection of primitives. It is equivalent to initializing a `Cesium.PrimitiveCollection` instance.

:::tip
A member attribute `Scene.primitives(PrimitiveCollection)` of the `Viewer` instance that is initialized by `vc-viewer`. It is also a primitive itself so collections can be added to collections forming a hierarchy.
:::

### Basic usage

Basic usage of VcCollectionPrimitive component.

:::demo Use the `vc-collection-primitive` tag to add a collection of billboard primitives and model primitives to the viewer.

```html
<el-row ref="viewerContainer" class="demo-viewer">
  <vc-viewer @ready="onViewerReady">
    <vc-collection-primitive @click="onClicked" :show="show" ref="collectionRef">
      <vc-collection-billboard :billboards="billboards1"></vc-collection-billboard>
      <vc-collection-primitive>
        <vc-collection-billboard :billboards="billboards2"></vc-collection-billboard>
      </vc-collection-primitive>
    </vc-collection-primitive>
    <vc-collection-primitive :polygons="polygons">
      <vc-primitive-model
        @click="onClicked"
        url="https://zouyaoji.top/vue-cesium/SampleData/models/CesiumAir/Cesium_Air.glb"
        :modelMatrix="modelMatrix"
        :scale="10000"
        :minimumPixelSize="128"
        :maximumScale="200000"
      >
      </vc-primitive-model>
      <vc-polygon @click="onClicked" :positions="positions" color="yellow"></vc-polygon>
    </vc-collection-primitive>
  </vc-viewer>
  <el-row class="demo-toolbar">
    <el-button type="danger" round @click="unload">Unload</el-button>
    <el-button type="danger" round @click="load">Load</el-button>
    <el-button type="danger" round @click="reload">Reload</el-button>
    <el-switch v-model="show" active-color="#13ce66" inactive-text="Show/Hide"> </el-switch>
  </el-row>
</el-row>

<script>
  import { ref, reactive, getCurrentInstance, onMounted, watch } from 'vue'
  export default {
    setup() {
      // state
      const collectionRef = ref(null)
      const billboards1 = ref([])
      const billboards2 = ref([])
      const modelMatrix = ref(null)
      const show = ref(true)
      const instance = getCurrentInstance()
      const positions = ref([
        [105, 32],
        [106, 34],
        [107, 30]
      ])
      const polygons = ref([
        {
          positions: [
            [115, 37],
            [115, 32],
            [107, 33],
            [102, 31],
            [102, 35]
          ],
          appearance: {
            type: 'MaterialAppearance',
            options: {
              material: 'green'
            }
          }
        },
        {
          positions: [
            { lng: 108.0, lat: 42.0 },
            { lng: 100.0, lat: 42.0 },
            { lng: 104.0, lat: 40.0 }
          ],
          appearance: {
            type: 'MaterialAppearance',
            options: {
              material: 'red'
            }
          },
          depthFailAppearance: {
            type: 'MaterialAppearance',
            options: {
              material: 'red'
            }
          }
        },
        {
          positions: [90.0, 41.0, 0.0, 85.0, 41.0, 500000.0, 80.0, 41.0, 0.0],
          appearance: {
            type: 'MaterialAppearance',
            options: {
              material: 'blue'
            }
          }
        },
        {
          polygonHierarchy: {
            positions: [
              [99, 30],
              [85, 30],
              [85, 40],
              [99, 40]
            ],
            holes: [
              {
                positions: [
                  [97, 31],
                  [97, 39],
                  [87, 39],
                  [87, 31]
                ],
                holes: [
                  {
                    positions: [
                      [95, 33],
                      [89, 33],
                      [89, 37],
                      [95, 37]
                    ],
                    holes: [
                      {
                        positions: [
                          [93, 34],
                          [91, 34],
                          [91, 36],
                          [93, 36]
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          appearance: {
            type: 'MaterialAppearance',
            options: {
              material: 'yellow'
            }
          }
        }
      ])
      // methods
      const onClicked = e => {
        console.log(e)
      }
      const unload = () => {
        collectionRef.value.unload()
      }
      const reload = () => {
        collectionRef.value.reload()
      }
      const load = () => {
        collectionRef.value.load()
      }
      const onViewerReady = ({ Cesium, viewer }) => {
        for (var i = 0; i < 100; i++) {
          let billboard1 = {}
          billboard1.position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 }
          billboard1.image = 'https://zouyaoji.top/vue-cesium/favicon.png'
          billboard1.scale = 0.1
          billboards1.value.push(billboard1)

          let billboard2 = {}
          billboard2.position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 }
          billboard2.image = 'https://zouyaoji.top/vue-cesium/favicon.png'
          billboard2.scale = 0.15
          billboards2.value.push(billboard2)
        }

        modelMatrix.value = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(105, 38, 10000))
      }

      return {
        unload,
        reload,
        load,
        onClicked,
        onViewerReady,
        collectionRef,
        billboards1,
        billboards2,
        modelMatrix,
        show,
        positions,
        polygons
      }
    }
  }
</script>
```

:::

### Props

<!-- prettier-ignore -->
| Name | Type | Default | Description |
| ----------------- | ------- | ------- | ------------------------------------------------------------------------------------------ |
| show | boolean | `true` | `optional` Determines if the primitives in the collection will be shown. |
| destroyPrimitives | boolean | `true` | `optional` Determines if primitives in the collection are destroyed when they are removed. |
| enableMouseEvent | boolean | `true` | `optional` Specify whether the mouse event takes effect. |
| polygons | Array\<PolygonPrimitive\> | `[]` | Specify an array of polygons collections. The structure of the array object is the same as the attribute of the `vc-polygon` component.|

### Events

| Name       | Parameters                              | Description                                                      |
| ---------- | --------------------------------------- | ---------------------------------------------------------------- |
| beforeLoad | (instance: VcComponentInternalInstance) | Triggers before the cesiumObject is loaded.                      |
| ready      | (readyObj: VcReadyObject)               | Triggers when the cesiumObject is successfully loaded.           |
| destroyed  | (instance: VcComponentInternalInstance) | Triggers when the cesiumObject is destroyed.                     |
| mousedown  | (evt: VcPickEvent)                      | Triggers when the mouse is pressed on this primitive.            |
| mouseup    | (evt: VcPickEvent)                      | Triggers when the mouse bounces up on this primitive.            |
| click      | (evt: VcPickEvent)                      | Triggers when the mouse clicks on the primitive.                 |
| clickout   | (evt: VcPickEvent)                      | Triggers when the mouse clicks outside the primitive.            |
| dblclick   | (evt: VcPickEvent)                      | Triggers when the left mouse button double-clicks the primitive. |
| mousemove  | (evt: VcPickEvent)                      | Triggers when the mouse moves on this primitive.                 |
| mouseover  | (evt: VcPickEvent)                      | Triggers when the mouse moves to this primitive.                 |
| mouseout   | (evt: VcPickEvent)                      | Triggers when the mouse moves out of this primitive.             |

### Slots

<!-- prettier-ignore -->
| Name | Description | Subtags |
| ---- | ----------- | ------- |
| default | This is where primitive sub tags content goes. | vc-primitive/vc-primitive-classfication/vc-primitive-ground/vc-primitive-ground-polyline/vc-primitive-model/vc-primitive-tileset/vc-primitive-particle/vc-collection-billboard/vc-collection-label/vc-collection-point/vc-collection-polyline/vc-collection-primitive/vc-post-process-stage/vc-post-process-stage-scan/vc-post-process-stage-collection/vc-polygon |

### VcPolygon

Loading the polygon primitive. It is equivalent to initializing a `PolygonPrimitive` instance.

**Note:** It needs to be a subcomponent of `vc-collection-primitive` to load normally.

### VcPolygon Props

<!-- prettier-ignore -->
| Name | Type | Default | Description |
| ------------------ | --------------------- | ------- | ------------------------------------------------------------------------------ |
| id | any | | `optional` The user-defined object to be returned when this polygon is picked. |
| show | boolean | `true` | `optional` true if this polygon will be shown; otherwise, false. |
| positions | VcCartesian3Array | | `optional` The positions. |
| polygonHierarchy | VcPolygonHierarchy | | `optional` The polygonHierarchy. |
| clampToGround | boolean | `false` | `optional` Specify whether the polygon is attached to the ground or 3dtiles. |
| arcType | number \| Cesium.ArcType | | `optional` The type of line the polygon edges must follow. Valid options are ArcType.GEODESIC and ArcType.RHUMB. |
| classificationType | number \| Cesium.ClassificationType | | `optional` An enum Property specifying whether this polygon will classify terrain, 3D Tiles, or both when on the ground. |
| appearance | VcAppearance | | `optional` The appearance. |
| depthFailColor | VcColor\|Array\|string | | `optional` Specify the depthFailColor. |
| depthFailAppearance | VcAppearance | | `optional` Specify the depthFailAppearance. |
| ellipsoid | Cesium.Ellipsoid | | `optional` The ellipsoid to be used as a reference. |
| allowPicking | boolean | `true` | `optional` When true, polygon will only be pickable with Scene#pick. When false, GPU memory is saved. |
| asynchronous | boolean | `true` | `optional` Determines if the poygon primitive will be created asynchronously or block until ready. |
| enableMouseEvent | boolean | `true` | `optional` Specify whether the mouse event takes effect. |

### VcPolygon Events

| Name       | Parameters                              | Description                                                      |
| ---------- | --------------------------------------- | ---------------------------------------------------------------- |
| beforeLoad | (instance: VcComponentInternalInstance) | Triggers before the cesiumObject is loaded.                      |
| ready      | (readyObj: VcReadyObject)               | Triggers when the cesiumObject is successfully loaded.           |
| destroyed  | (instance: VcComponentInternalInstance) | Triggers when the cesiumObject is destroyed.                     |
| mousedown  | (evt: VcPickEvent)                      | Triggers when the mouse is pressed on this primitive.            |
| mouseup    | (evt: VcPickEvent)                      | Triggers when the mouse bounces up on this primitive.            |
| click      | (evt: VcPickEvent)                      | Triggers when the mouse clicks on the primitive.                 |
| clickout   | (evt: VcPickEvent)                      | Triggers when the mouse clicks outside the primitive.            |
| dblclick   | (evt: VcPickEvent)                      | Triggers when the left mouse button double-clicks the primitive. |
| mousemove  | (evt: VcPickEvent)                      | Triggers when the mouse moves on this primitive.                 |
| mouseover  | (evt: VcPickEvent)                      | Triggers when the mouse moves to this primitive.                 |
| mouseout   | (evt: VcPickEvent)                      | Triggers when the mouse moves out of this primitive.             |

### VcPolygon Methods

| Name               | Parameters                               | Description                                     |
| ------------------ | ---------------------------------------- | ----------------------------------------------- |
| load               | () => Promise\<false \| VcReadyObject\>  | Load components manually.                       |
| reload             | () => Promise\<false \| VcReadyObject\>  | Reload components manually.                     |
| unload             | () => Promise\<boolean\>                 | Destroy the loaded component manually.          |
| getCreatingPromise | () => Promise\<boolean \| VcReadyObject> | Get the creatingPromise.                        |
| getCesiumObject    | () => VcCesiumObject                     | Get the Cesium object loaded by this component. |

### Reference

- Refer to the official documentation: **[PrimitiveCollection](https://cesium.com/docs/cesiumjs-ref-doc/PrimitiveCollection.html)**
