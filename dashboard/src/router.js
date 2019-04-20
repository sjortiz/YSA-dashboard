import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Vuetify from 'vuetify'

Vue.use(Router)
Vue.use(Vuetify)

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
          component: () => import('@/views/HomeDashboard.vue')
        },
        {
          path: ':entity',
          component: () => import('@/components/entitiesFeed.vue')
        },
        {
          path: 'apps/new',
          component: () => import('@/components/CreateApp.vue')
        },
        {
          path: 'groups/new',
          component: () => import('@/components/CreateGroup.vue')
        },
        {
          path: 'features/new',
          component: () => import('@/components/CreateFeature.vue')
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
