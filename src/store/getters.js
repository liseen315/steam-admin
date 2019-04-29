const getters = {
  userInfo: state => state.sysUser,
  menus: state => state.sysUser.menus,
  permissions: state => state.sysUser.permissions,
  hasGetUserInfo: state => state.sysUser.hasGetUserInfo,
  permission_routers: state => state.menus.routers,
  addRouters: state => state.menus.addRouters
}

export default getters
