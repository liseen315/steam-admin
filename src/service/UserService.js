import { API_LOGIN, API_GET_MANAGERINFO, API_LOGINOUT } from './apiPath'
import BaseService from './BaseService'
class UserService extends BaseService {
  login (account) {
    return this.post(API_LOGIN, account)
  }

  getInfo (token) {
    return this.get(API_GET_MANAGERINFO, token)
  }

  logout () {
    return this.post(API_LOGOUT)
  }
}

export default UserService
