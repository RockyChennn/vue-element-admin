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
      path: 'manageRecord',
      name: 'AssetManagement',
      component: () => import('@/views/assetManagement/manageRecord/index'),
      meta: { title: '设备管理' }
    },
    {
      path: 'addItem',
      name: 'AssetRecord',
      component: () => import('@/views/assetManagement/addItem/index'),
      meta: { title: '设备录入' }
    },
    {
      path: 'repairList',
      name: 'RepairList',
      component: () => import('@/views/assetManagement/repairList/index'),
      meta: { title: '故障设备列表' }
    },
    {
      path: 'assetEmail',
      name: 'AssetEmail',
      component: () => import('@/views/assetManagement/assetEmail/index'),
      meta: { title: '邮箱管理' }
    },
    {
      path: 'assetShortMessage',
      name: 'AssetShortMessage',
      component: () =>
        import('@/views/assetManagement/assetShortMessage/index'),
      meta: { title: '短信管理' }
    }
  ]
}

export default assetRouter
