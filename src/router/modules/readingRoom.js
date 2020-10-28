import Layout from '@/layout'

const readingRouter = {
  path: '/readingRoomManagement',
  component: Layout,
  redirect: '/readingRoomManagement/managememt',
  name: 'ReadingRoomManagement',
  meta: {
    title: '阅览室管理',
    icon: 'el-icon-monitor'
  },
  children: [
    {
      path: 'managememt',
      name: 'Managememt',
      component: () => import('@/views/readingRoomManagement/managememt/index'),
      meta: { title: '阅览室管理' }
    },
    {
      path: 'recordManagememt',
      name: 'RecordAddRecord',
      component: () =>
        import('@/views/readingRoomManagement/recordManagememt/index'),
      meta: { title: '记录管理' }
    }
    // {
    //   path: 'userRecord',
    //   name: 'UserRecord',
    //   component: () => import('@/views/readingRoomManagement/useRecord/index'),
    //   meta: { title: '使用登记' }
    // },
    // {
    //   path: 'freeItem',
    //   name: 'FreeItem',
    //   component: () => import('@/views/readingRoomManagement/freeItem/index'),
    //   meta: { title: '电脑归还' }
    // },
    // {
    //   path: 'findItem',
    //   name: 'FindItem',
    //   component: () => import('@/views/readingRoomManagement/findItem/index'),
    //   meta: { title: '检索信息' }
    // },
    // {
    //   path: 'statistics',
    //   name: 'Statistics',
    //   component: () => import('@/views/readingRoomManagement/statistics/index'),
    //   meta: { title: '数据统计' }
    // },
    // {
    //   path: 'reminder',
    //   name: 'Reminder',
    //   component: () => import('@/views/readingRoomManagement/reminder/index'),
    //   meta: { title: '逾期管理' }
    // }
  ]
}

export default readingRouter
