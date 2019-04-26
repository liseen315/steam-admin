import Layout from '@/components/layout'
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/home.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    component: () => import('@/views/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import('@/views/error-page/404.vue')
  }
]

export const asyncRouterMap = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: Layout,
    meta: {},
    children: [{}]
  }
]
