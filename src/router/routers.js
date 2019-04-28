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
    path: '/sys',
    name: 'layout',
    redirect: '/sys/userlist',
    component: Layout,
    children: [
      {
        path: '/userlist',
        name: 'userlist',
        meta: {
          title: '管理员列表'
        },
        menu: 'sys_user',
        component: () => import('@/views/userList.vue')
      }
    ]
  },
  {
    path: '/sys',
    name: 'layout',
    redirect: '/sys/rolelist',
    component: Layout,
    children: [
      {
        path: '/rolelist',
        name: 'rolelist',
        meta: {
          title: '角色列表'
        },
        menu: 'sys_user',
        component: () => import('@/views/roleList.vue')
      }
    ]
  }
]
