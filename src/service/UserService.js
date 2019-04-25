import { API_LOGIN, API_GET_MANAGERINFO, API_LOGOUT } from './apiPath'
import BaseService from './BaseService'
class UserService extends BaseService {
  login (account) {
    return this.post(API_LOGIN, account)
  }

  getInfo () {
    return this.get(API_GET_MANAGERINFO)
  }

  logout () {
    return this.post(API_LOGOUT)
  }
}

export default UserService
