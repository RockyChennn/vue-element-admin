/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const sportRouter = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: '体育用品预约',
  meta: {
    title: 'nested',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: '物品借用录入',
      meta: { title: '物品借用录入' }
    },
    {
      path: 'menu2',
      name: '查询记录',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: '查询记录' }
    },
    {
      path: 'menu3',
      name: '提醒设置',
      component: () => import('@/views/nested/menu3/index'),
      meta: { title: '提醒设置' }
    }
  ]
}

export default sportRouter
