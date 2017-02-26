import Vue from 'vue'
import Router from 'vue-router'
import ListView from 'components/ListView'
import DetailView from 'components/DetailView'
import AddView from 'components/AddView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/create-recipe',
      name: 'AddView',
      component: AddView
    },
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
      path: '/recipes/:guid',
      name: 'DetailView',
      component: DetailView,
      props: true
    }
  ]
})
