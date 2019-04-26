import config from '@/config'
import Cookies from 'js-cookie'

const { title, cookieExpires } = config

export const TOKEN_KEY = 'auth'
/**
 * 往本地存储token
 * @param {String} token
 */
export const setToken = token => {
  window.localStorage.setItem(TOKEN_KEY, token)
}
/**
 * 获取token
 */
export const getToken = () => {
  return window.localStorage.getItem(TOKEN_KEY)
}
/**
 * 删除token
 */
export const removeToken = () => {
  window.localStorage.removeItem(TOKEN_KEY)
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = exp => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

export const getRouteTitleHandled = route => {
  let router = { ...route }
  let meta = { ...route.meta }
  let title = ''
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      title = meta.title(router)
    } else title = meta.title
  }
  meta.title = title
  router.meta = meta
  return router
}

export const showTitle = (item, vm) => {
  let { title, __titleIsFunction__ } = item.meta
  if (!title) return
  title = (item.meta && item.meta.title) || item.name
  return title
}

export const setTitle = (routeItem, vm) => {
  const handledRoute = getRouteTitleHandled(routeItem)
  const pageTitle = showTitle(handledRoute, vm)
  const resTitle = pageTitle ? `${title} - ${pageTitle}` : title
  window.document.title = resTitle
}
