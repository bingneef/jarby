import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Overview from 'components/Overview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview
    }
  ]
})
