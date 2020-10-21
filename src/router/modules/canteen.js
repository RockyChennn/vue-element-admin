/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const canteenRouter = {
  path: '/canteen',
  component: Layout,
  redirect: '/canteen/reservation',
  name: 'CanteenManagement',
  meta: {
    title: '食堂就餐预约管理',
    icon: 'el-icon-burger'
  },
  children: [
    {
      path: 'reservation',
      name: 'Reservation',
      component: () => import('@/views/canteen/reservation/index'),
      meta: { title: '新增预约' }
    },
    {
      path: 'viewMenu',
      name: 'ViewMenu',
      component: () => import('@/views/canteen/viewMenu/index'),
      meta: { title: '查看菜单' }
    },
    {
      path: 'viewCount',
      name: 'ViewCount',
      component: () => import('@/views/canteen/viewCount/index'),
      meta: { title: '预约人数' }
    },
    {
      path: 'addMenu',
      name: 'AddMenu',
      component: () => import('@/views/canteen/addMenu/index'),
      meta: { title: '添加菜单' }
    }
  ]
}

export default canteenRouter
