import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import EstimationsList from './components/EstimationsList'
import Estimation from './components/Estimation'

const router = new VueRouter({
  routes: [
    { path: '/', component: EstimationsList },
    { path: '/estimation/:id', name: 'estimation', component: Estimation, props: true }
  ]
})

export default router
