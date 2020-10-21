/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const sportRouter = {
  path: '/sportsGoodsManagement',
  component: Layout,
  redirect: '/sportsGoodsManagement/viewList',
  name: 'SportsGoodsManagement',
  meta: {
    title: '体育用品管理',
    icon: 'el-icon-basketball'
  },
  children: [
    {
      path: 'viewList',
      name: 'ViewList',
      component: () => import('@/views/sportsGoodsManagement/viewList/index'),
      meta: { title: '借用查看' }
    },
    {
      path: 'addRecord',
      name: 'AddRecord',
      component: () => import('@/views/sportsGoodsManagement/addRecord/index'),
      meta: { title: '借用录入' }
    },
    {
      path: 'findItem',
      name: 'FindItem',
      component: () => import('@/views/sportsGoodsManagement/findItem/index'),
      meta: { title: '借阅查询' }
    },
    {
      path: 'reminder',
      name: 'Reminder',
      component: () => import('@/views/sportsGoodsManagement/reminder/index'),
      meta: { title: '逾期提醒' }
    }
  ]
}

export default sportRouter
