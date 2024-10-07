<!--
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-04-25 13:20:33
 * @LastEditTime: 2022-12-08 22:00:36
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \vue-cesium@next\website\docs\zh-CN\migration-from-2.x.md
-->

## 从 Vue for Cesium 2.x 升级

本文档将帮助你从 Vue for Cesium 2.x 升级至 Vue for Cesium 3.x.

### 不兼容更新

根据 vue 官方推荐风格和从简原则，简化了一些组件命名，由此带来的不便敬请谅解。以下是不兼容更新的列表：

### vc-viewer

#### Props

- `logo` -> `showCredit`

### vc-provider-imagery-arcgis-mapserver

- Renamed to `vc-imagery-provider-arcgis`

### vc-provider-terrain-arcgis-tiled-elevation

- Renamed to `vc-terrain-provider-arcgis`

### vc-provider-imagery-style-mapbox

- Renamed to `vc-imagery-provider-mapbox`

### vc-provider-imagery-tile-mapservice

- Renamed to `vc-imagery-provider-tilemap`

### vc-provider-imagery-openstreetmap

- Renamed to `vc-imagery-provider-osm`

### vc-provider-imagery-googleearth-enterprise

- Renamed to `vc-provider-imagery-google`

### vc-provider-imagery-tile-single

- Renamed to `vc-imagery-provider-singletile`

### vc-primitive-polyline-ground

- Renamed to `vc-primitive-ground-polyline`

### vc-collection-primitive-billboard

- Renamed to `vc-collection-billboard`

### vc-primitive-billboard

- Renamed to `vc-billboard`

### vc-collection-primitive-label

- Renamed to `vc-collection-label`

### vc-primitive-label

- Renamed to `vc-label`

### vc-collection-primitive-point

- Renamed to `vc-collection-point`

### vc-primitive-point

- Renamed to `vc-point`

### vc-collection-primitive-polyline

- Renamed to `vc-collection-polyline`

### vc-primitive-polyline

- Renamed to `vc-polyline`
