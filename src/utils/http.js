import axios from 'axios'

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
httpInstance.interceptors.response.use(response => response, error => Promise.reject(error))

export default httpInstance