import {
  API_LOGIN,
  API_GET_MANAGERINFO,
  API_LOGOUT,
  API_CHANGE_PASSWORD,
  API_GET_AUTHLIST,
  API_ADD_AUTH,
  API_REMOVE_AUTH
} from './apiPath'
import BaseService from './BaseService'
class AuthService extends BaseService {
  /**
   * 登录
   * @param {Object} account
   */
  login (account) {
    return this.post(API_LOGIN, account)
  }
  /**
   * 获取信息
   */
  getInfo () {
    return this.get(API_GET_MANAGERINFO)
  }
  /**
   * 更改密码
   * @param {String} newpass
   */
  changePassWord (npw) {
    return this.post(API_CHANGE_PASSWORD, { newPassWord: npw })
  }
  /**
   * 登出
   */
  logout () {
    return this.post(API_LOGOUT)
  }
  /**
   * 获取管理员列表
   */
  getList () {
    return this.get(API_GET_AUTHLIST)
  }
  /**
   * 添加管理员
   * @param {*} authInfo
   */
  addAuth (authInfo) {
    return this.post(API_ADD_AUTH, authInfo)
  }

  /**
   * 删除管理员
   * @param {*} userId
   */
  removeAuth (userId) {
    return this.post(API_REMOVE_AUTH, { userId: userId })
  }
}

export default AuthService
