import Layout from '@/layout'

const visitorRouter = {
  path: '/visitorManagement',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/visitorManagement/index'),
      name: 'VisitorManagement',
      meta: {
        title: '访客管理',
        icon: 'eye-open'
      }
    }
  ]
}
export default visitorRouter
