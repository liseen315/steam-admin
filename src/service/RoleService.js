import BaseService from './BaseService'

import { API_GET_ROLELIST } from './apiPath.js'

class RoleService extends BaseService {
  getRoleList () {
    return this.get(API_GET_ROLELIST)
  }
}

export default RoleService
