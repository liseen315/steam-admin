import Layout from '@/components/layout'
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      icon: 'ios-paper'
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
          title: '首页',
          icon: 'ios-paper'
        },
        component: () => import('@/views/home.vue')
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/sys',
    redirect: 'sys/newslist',
    component: Layout,
    name: 'contentManager',
    meta: {
      title: '内容管理',
      icon: 'ios-paper'
    },
    children: [
      {
        path: '/newslist',
        name: 'newslist',
        meta: {
          title: '新闻',
          menu: 'sys_news'
        },
        component: () => import('@/views/newsList.vue')
      }
    ]
  },
  {
    path: '/sys',
    redirect: 'sys/spiderlist',
    component: Layout,
    name: 'spiderManager',
    meta: {
      title: '爬虫管理',
      icon: 'md-bug'
    },
    children: [
      {
        path: '/spiderlist',
        name: 'spiderlist',
        meta: {
          title: '爬虫',
          menu: 'sys_spider'
        },
        component: () => import('@/views/spiderList.vue')
      }
    ]
  },
  {
    path: '/sys',
    redirect: 'sys/userlist',
    component: Layout,
    name: 'permissionManager',
    meta: {
      title: '权限管理',
      icon: 'md-contact'
    },
    children: [
      {
        path: '/userlist',
        name: 'userlist',
        meta: {
          title: '管理员列表',
          menu: 'sys_user',
          icon: 'ios-body'
        },

        component: () => import('@/views/userList.vue')
      },
      {
        path: '/rolelist',
        name: 'rolelist',
        meta: {
          title: '角色列表',
          menu: 'sys_user',
          icon: 'ios-man'
        },
        component: () => import('@/views/roleList.vue')
      }
    ]
  }
]
