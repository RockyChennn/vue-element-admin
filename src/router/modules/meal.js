/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const mealRouter = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: '就餐预约管理',
  meta: {
    title: 'nested',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: '预约情况查询',
      meta: { title: '预约情况查询' }
    },
    {
      path: 'menu2',
      name: '添加菜单',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: '添加菜单' }
    }
  ]
}

export default mealRouter
