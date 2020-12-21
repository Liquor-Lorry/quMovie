import axios from 'axios'

import { Toast } from 'vant'

const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16082995112526913943830529","bc":"310100"}'
  }
})

// 请求拦截器
http.interceptors.request.use(config => {
  // 这里可以做请求参数配置

  // 启动loading
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    overlay: true,
    loadingType: 'spinner'
  })

  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
http.interceptors.response.use(response => {
  // 处理成功回调 比如200的请求

  // 取消loading效果
  Toast.clear()

  return response
}, err => {
  return Promise.reject(err)
})

export default http
