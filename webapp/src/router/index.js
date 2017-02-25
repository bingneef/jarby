import Vue from 'vue'
import Router from 'vue-router'
import ListView from 'components/ListView'
import DetailView from 'components/DetailView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'ListView'}
    },
    {
      path: '/recipes',
      name: 'ListView',
      component: ListView
    },
    {
      path: '/recipes/:id',
      name: 'DetailView',
      component: DetailView,
      props: true
    }
  ]
})
