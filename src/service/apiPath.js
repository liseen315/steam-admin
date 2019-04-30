let originURL = ''

// 管理员登录
export const API_LOGIN = originURL + '/sysuser/login' // post

// 获取管理员Info
export const API_GET_MANAGERINFO = originURL + '/sysuser/info' // get

// 更改密码
export const API_CHANGE_PASSWORD = originURL + '/sysuser/changepw' // post

// 管理登出
export const API_LOGOUT = originURL + '/sysuser/logout' // post

// 获取管理员列表

export const API_GET_AUTHLIST = originURL + '/sysuser/list' // get

// 增加管理员

export const API_ADD_AUTH = originURL + '/sysuser/add' // post

// 获取角色列表

export const API_GET_ROLELIST = originURL + '/sysrole/rolelist' // get
