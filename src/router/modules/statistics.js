import Layout from '@/layout'

const statisticsRouter = {
  path: '/statistics',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/statistics/index'),
      name: 'statistics',
      meta: {
        title: '数据分析平台',
        icon: 'el-icon-s-data'
      }
    }
  ]
}
export default statisticsRouter
