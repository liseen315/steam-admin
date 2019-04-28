const getters = {
  menus: state => state.sysUser.menus,
  permissions: state => state.sysUser.permissions,
  hasGetUserInfo: state => state.sysUser.hasGetUserInfo
}

export default getters
