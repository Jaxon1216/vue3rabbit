import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { useUserStore } from '@/stores/user'
import router from '@/router'
// 创建axios实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 30000
})

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1. 从pinia获取token数据
  const userStore = useUserStore()
  // 2. 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))
//axios响应式拦截器
httpInstance.interceptors.response.use(response => response.data, error => {
  // console.dir(error)
  //统一错误提示
  ElMessage({
    type: 'warning',
    message: error.response?.data?.message || '请求失败'
  })

  //401token失效处理
  if (error.response?.status === 401) {
    // 1. 清除用户信息
    const userStore = useUserStore()
    userStore.clearUserInfo()
    // 2. 跳转到登录页
    router.push('/login')
  }
  return Promise.reject(error)
})

export default httpInstance