import Vue from 'vue'
import Router from 'vue-router'
import Kanban from '@/components/Kanban'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Kanban',
      component: Kanban
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
