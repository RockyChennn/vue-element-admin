/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const assetRouter = {
  path: '/assetManagement',
  component: Layout,
  redirect: '/assetManagement/addItem',
  name: 'AssetManagement',
  meta: {
    title: '资产管理',
    icon: 'el-icon-receiving'
  },
  children: [
    {
      path: 'addItem',
      name: 'AssetRecord',
      component: () => import('@/views/assetManagement/addItem/index'),
      meta: { title: '设备录入' }
    },
    {
      path: 'manageRecord',
      name: 'AssetManagement',
      component: () => import('@/views/assetManagement/manageRecord/index'),
      meta: { title: '设备管理' }
    }
  ]
}

export default assetRouter
