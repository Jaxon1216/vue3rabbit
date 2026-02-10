import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  return config
}, error => Promise.reject(error))
//axios响应式拦截器
httpInstance.interceptors.response.use(response => response.data, error => {
  // console.dir(error)
  //统一错误提示
  ElMessage({
    type: 'warning',
    message: error.response.data.message
  })
  return Promise.reject(error)
})

export default httpInstance