import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入初始化样式文件
import '@/styles/common.scss'

import { useIntersectionObserver } from '@vueuse/core'
//测试接口函数
// import {getCategory} from '@/apis/testAPI'
// getCategory().then(res => {
//   console.log(res)
// })

import { lazyPlugin } from '@/directives'

//引用全局组件插件
import { componentPlugin } from '@/components'
//得到实例
const app = createApp(App)
//注册pinia
app.use(createPinia())

app.use(router)
//注册懒加载指令插件
app.use(lazyPlugin)
//注册全局组件插件
app.use(componentPlugin)
//挂载实例
app.mount('#app')
