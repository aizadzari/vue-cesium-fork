/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-06-04 13:55:35
 * @LastEditTime: 2022-08-12 11:47:16
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \10_vue-cesium\packages\composables\use-primitive-collections\index.ts
 */
/**
 * for
 * PrimitiveCollection
 * BillboardCollection
 * LabelCollection
 * PointPrimitiveCollection
 * PolylineCollection
 */

import { VcComponentInternalInstance, VcViewerProvider } from '@vue-cesium/utils/types'
import useCommon from '../use-common'
import { mergeDescriptors } from '@vue-cesium/utils/merge-descriptors'
import { provide } from 'vue'
import { vcKey } from '@vue-cesium/utils/config'

export type Collection =
  | Cesium.PrimitiveCollection
  | Cesium.BillboardCollection
  | Cesium.LabelCollection
  | Cesium.PointPrimitiveCollection
  | Cesium.PolylineCollection

export default function (props, ctx, vcInstance: VcComponentInternalInstance) {
  // state
  const commonState = useCommon(props, ctx, vcInstance)
  if (commonState === void 0) {
    return
  }
  // methods
  vcInstance.mount = async () => {
    const primitives = commonState.$services.primitives
    const collection = vcInstance.cesiumObject as Collection
    const object = primitives && primitives.add(collection)
    return Cesium.defined(object)
  }
  vcInstance.unmount = async () => {
    const primitives = commonState.$services.primitives
    const collection = vcInstance.cesiumObject as Collection
    return primitives && primitives.remove(collection)
  }

  const getServices = (): VcViewerProvider => {
    return mergeDescriptors(commonState.getServices(), {
      get primitives() {
        return vcInstance.cesiumObject as Collection
      }
    })
  }

  // provide
  provide(vcKey, getServices())

  return {
    transformProps: commonState.transformProps,
    transformProp: commonState.transformProp,
    unwatchFns: commonState.unwatchFns,
    setPropsWatcher: commonState.setPropsWatcher
  }
}
