const getters = {
  menus: state => state.sysUser.menus,
  permissions: state => state.sysUser.permissions,
  hasGetUserInfo: state => state.sysUser.hasGetUserInfo,
  addRouters: state => state.menus.addRouters
}

export default getters
