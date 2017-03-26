<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
import store from '../store'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    AppHeader
  },
  beforeRouteEnter (to, from, next) {
    axios.get('/api/v1/current_user').then(response => {
      store.commit('setCurrentUser', response.data)
      next()
    })
  }
}
</script>

<style lang="sass">

</style>
