import { API_LOGIN, API_GET_MANAGERINFO, API_LOGOUT } from './apiPath'
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
  changePassWord (newpass) {
    return this.post(API_CHANGE_PASSWORD, newpass)
  }
  /**
   * 登出
   */
  logout () {
    return this.post(API_LOGOUT)
  }
}

export default AuthService
