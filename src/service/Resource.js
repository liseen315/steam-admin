import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { TOKEN_KEY, getToken } from '../utils'
class Resource {
  constructor (contentType) {
    this._axiosInstance = null
    this._url = ''
    this.init(contentType)
  }

  init (contentType) {
    this._axiosInstance = axios.create({
      timeout: 5000, // 延迟5秒
      withCredentials: false // 是否开启跨域验证 默认不开启
    })

    // 判断本地存储是否有token有就带到header内
    let tokenValue = getToken(TOKEN_KEY)
    if (tokenValue) {
      this.setHeader(TOKEN_KEY, tokenValue)
    }

    // 注入request钩子函数
    this.injectRequestHook(config => {
      // 根据不同的Content-Type调整请求参数格式
      switch (contentType) {
        case 'application/json':
          break
        case 'application/x-www-form-urlencoded':
        default:
          config.data = qs.stringify(config.data)
          break
      }
      return config
    })
  }
  /**
   * 设置header
   * @param {String} key header key
   * @param {String} value headervalue
   * @param {String} requestType 请求类型默认common
   */
  setHeader (key, value, requestType = 'common') {
    if (key && value) {
      let header = this._axiosInstance.defaults.headers[requestType]
      header[key] = value
    }
  }
  /**
   * 请求钩子
   * @param {Function} hookFunction 请求钩子函数
   */
  injectRequestHook (hookFunction) {
    this._axiosInstance.interceptors.request.use(config => {
      if (typeof hookFunction === 'function') {
        return hookFunction(config)
      }
    })
  }
  /**
   * response拦截
   * @param {Function} resolveHook 成功钩子
   * @param {Function} rejectHook 失败钩子
   */
  injectResponseHook (resolveHook, rejectHook) {
    this._axiosInstance.interceptors.response.use(
      response => {
        if (typeof resolveHook === 'function') {
          let returnValue = resolveHook(response)
          if (typeof returnValue !== 'undefined') {
            return returnValue
          }
        } else {
          return response
        }
      },
      error => {
        if (typeof rejectHook === 'function') {
          let returnValue = rejectHook(error)
          if (typeof returnValue !== 'undefined') {
            if (returnValue instanceof Promise) {
              return returnValue
            }
            return Promise.reject(returnValue)
          }
        } else {
          return Promise.reject(error)
        }
      }
    )
  }

  get (url, param) {
    this._url = url
    return this._axiosInstance.get(url, { params: param })
  }

  post (url, param) {
    this._url = url
    return this._axiosInstance.post(url, param)
  }
}

export default Resource
