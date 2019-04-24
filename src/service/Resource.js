import axios from 'axios'

class Resource {
  constructor () {
    this._axiosInstance = null
    this._url = ''
    this.init()
  }

  init () {
    this._axiosInstance = axios.create({
      timeout: 5000, // 延迟5秒
      withCredentials: false // 是否开启跨域验证 默认不开启
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
    console.log('---post--', param)
    return this._axiosInstance.post(url, param)
  }
}

export default Resource
