import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Koszyk from './views/Koszyk.vue'
import Produkt from './views/Produkt.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/koszyk',
      name: 'Koszyk',
      component: Koszyk
    },
    {
      path: '/produkt',
      name: 'Produkt',
      component: Produkt
    },
  ]
})
