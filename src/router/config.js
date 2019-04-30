import Layout from '@/components/layout'
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Layout,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          hideInMenu: true
        },
        component: () => import('@/views/home.vue')
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/content',
    component: Layout,
    name: 'content',
    meta: {
      title: '内容管理',
      icon: 'ios-paper'
    },
    children: [
      {
        path: 'newslist',
        name: 'newslist',
        meta: {
          title: '新闻管理',
          menu: 'sys_news'
        },
        component: () => import('@/views/newsList.vue')
      },
      {
        path: 'commentlist',
        name: 'commentlist',
        meta: {
          title: '评论管理',
          menu: 'sys_comment'
        },
        component: () => import('@/views/newsList.vue')
      }
    ]
  },
  {
    path: '/spider',
    component: Layout,
    name: 'spider',
    meta: {
      title: '爬虫管理',
      icon: 'md-bug'
    },
    children: [
      {
        path: 'spiderlist',
        name: 'spiderlist',
        meta: {
          title: '爬虫管理',
          menu: 'sys_spider'
        },
        component: () => import('@/views/spiderList.vue')
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    name: 'permission',
    meta: {
      title: '权限管理',
      icon: 'md-hammer'
    },
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        meta: {
          title: '管理员列表',
          menu: 'sys_user',
          icon: 'md-contacts'
        },

        component: () => import('@/views/userList.vue')
      },
      {
        path: 'rolelist',
        name: 'rolelist',
        meta: {
          title: '角色列表',
          menu: 'sys_user',
          icon: 'ios-man'
        },
        component: () => import('@/views/roleList.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true // 不在菜单内显示
    },
    component: () => import('@/views/error-page/404.vue')
  }
]
