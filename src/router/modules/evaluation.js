/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const evaluationRouter = {
  path: '/evaluation',
  component: Layout,
  redirect: '/evaluation/reservation',
  name: 'Evaluation',
  meta: {
    title: '评价管理',
    icon: 'el-icon-burger'
  },
  children: [
    {
      path: 'addCourse',
      name: 'AddCourse',
      component: () => import('@/views/evaluation/addCourse/index'),
      meta: { title: '课程录入' }
    },
    {
      path: 'addStudent',
      name: 'AddStudent',
      component: () => import('@/views/evaluation/addStudent/index'),
      meta: { title: '学员录入' }
    },
    {
      path: 'findEvaluation',
      name: 'FindEvaluation',
      component: () => import('@/views/evaluation/findEvaluation/index'),
      meta: { title: '评价查看' }
    },
    {
      path: 'evaluateTeacher',
      name: 'EvaluateTeacher',
      component: () => import('@/views/evaluation/evaluateTeacher/index'),
      meta: { title: '课程评价' }
    },
    {
      path: 'info',
      name: 'Info',
      component: () => import('@/views/evaluation/info/index'),
      meta: { title: '用户记录' }
    }
  ]
}

export default evaluationRouter
