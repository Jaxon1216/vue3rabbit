//用插件的方式对components中的所有组件进行全局化注册
import ImageView from './imageView/index.vue'
import XtxSku from './XtxSku/index.vue'
export const componentPlugin = {
  install (app) {
    app.component('XtxImageView', ImageView)
    app.component('XtxSku', XtxSku)
  }
}