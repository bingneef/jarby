<template>
  <section class="container">
    <button
        class="button button-outline"
        v-on:click="logOut">Log Out
      </button>
    <label for="email">Email</label>
    <input
      name="email"
      type="text"
      v-model="currentUser.email" />

    <label for="password">Password</label>
    <input
      name="password"
      type="password"
      v-model="currentUser.password" />

  </section>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'login',
  data () {
    return {
      currentUser: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    logOut () {
      axios.post('/api/v1/logout')
      .then(response => {
        let apiToken = null
        localStorage.setItem('apiToken', apiToken)
        axios.defaults.headers.common['Authorization'] = 'Token token=' + apiToken

        let routeOptions = {
          name: 'Login'
        }
        router.push(routeOptions)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    axios.get('/api/v1/current_user').then(response => {
      next(vm => {
        vm.currentUser = response.data
      })
    })
  }
}
</script>

<style lang="sass" scoped>

</style>
