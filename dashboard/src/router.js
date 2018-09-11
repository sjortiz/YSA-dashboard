import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      component: () => import('@/views/Dashboard.vue'),
      children: [
        {
          path: '',
          component: () => import('@/components/HomeDashboard.vue')
        },
        {
          path: 'apps',
          component: () => import('@/components/Apps.vue')
        },
        {
          path: 'apps/new',
          component: () => import('@/components/CreateApp.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    }
  ]
})
