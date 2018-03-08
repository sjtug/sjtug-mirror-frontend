import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
