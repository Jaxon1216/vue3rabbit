import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入初始化样式文件
import '@/styles/common.scss'

//测试接口函数
// import {getCategory} from '@/apis/testAPI'
// getCategory().then(res => {
//   console.log(res)
// })

//得到实例
const app = createApp(App)
//注册pinia
const pinia = createPinia()
//注册pinia
app.use(router)
//挂载实例
app.use(pinia).mount('#app')
