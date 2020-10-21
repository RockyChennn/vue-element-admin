/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const assetRouter = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  name: '资产管理',
  meta: {
    title: '资产管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: '资产管理1',
      meta: { title: 'menu1' },
      redirect: '/nested/menu1/menu1-1',
      children: [
        {
          path: 'menu1-1',
          component: () => import('@/views/nested/menu1/menu1-1'),
          name: '资产管理-1',
          meta: { title: 'menu1-1' }
        },
        {
          path: 'menu1-2',
          component: () => import('@/views/nested/menu1/menu1-2'),
          name: '资产管理-2',
          redirect: '/nested/menu1/menu1-2/menu1-2-1',
          meta: { title: 'menu1-2' },
          children: [
            {
              path: 'menu1-2-1',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
              name: 'Menu1-2-1',
              meta: { title: 'menu1-2-1' }
            },
            {
              path: 'menu1-2-2',
              component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
              name: 'Menu1-2-2',
              meta: { title: 'menu1-2-2' }
            }
          ]
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: 'menu2' }
    }
  ]
}

export default assetRouter
