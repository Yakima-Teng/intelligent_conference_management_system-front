import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/* meta的tags:为true时才插入tagsview，否则不插入 title：tagsview通过这个来判断是否是当前的页面 2020.11.11，自己瞎改了tagsview，希望别出事*/
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', tags: true }
    }]
  },

  {
    path: '/AddMeeting',
    component: Layout,
    redirect: '/AddMeeting/index',
    children: [
      {
        path: 'index',
        name: 'AddMeeting',
        component: () => import('@/views/AddMeeting/index'),
        meta: { title: '新建会议', tags: true }
      }
    ]
  },

  {
    path: '/MeetingSchedule',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'MeetingSchedule',
        redirect: '/MeetingSchedule/timeline',
        children: [
          {
            path: 'timeline',
            component: () => import('@/views/MeetingSchedule/timeline'),
            meta: { title: '会议日程', tags: true }
          },
          {
            path: 'date',
            component: () => import('@/views/MeetingSchedule/date'),
            meta: { title: '会议日程' }
          }
        ],
        component: () => import('@/views/MeetingSchedule/index')
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
