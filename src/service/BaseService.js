import Resource from './Resource'

class BaseService extends Resource {
  /**
   * BaseService类构造函数
   * @param {Boolean} isInjectResponseHook 是否注入通用Response钩子函数（默认：true）
   */
  constructor (isInjectResponseHook = true, contentType) {
    super(contentType)
    if (isInjectResponseHook) {
      this.injectResponseHook(response => {
        return response.data
      })
    }
  }
}

export default BaseService
