/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const canteenRouter = {
  path: '/canteen',
  component: Layout,
  redirect: '/canteen/reservation',
  name: 'CanteenManagement',
  meta: {
    title: '食堂就餐管理',
    icon: 'el-icon-burger'
  },
  children: [
    {
      path: 'viewCount',
      name: 'ViewCount',
      component: () => import('@/views/canteen/viewCount/index'),
      meta: { title: '预约查看' }
    },
    {
      path: 'manageMenu',
      name: 'ManageMenu',
      component: () => import('@/views/canteen/manageMenu/index'),
      meta: { title: '菜单管理' }
    }
  ]
}

export default canteenRouter
