<template>
  <section class="container">
    <label for="email">Email</label>
    <input
      name="email"
      type="text"
      v-model="user.email" />

    <label for="password">Password</label>
    <input
      name="password"
      type="password"
      v-model="user.password" />

    <button
      class="button"
      v-on:click="loginUser">Login
    </button>

  </section>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'login',
  data () {
    return {
      user: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    loginUser () {
      let params = this.user
      axios.post('/api/v1/login', params)
      .then(response => {
        axios.defaults.headers.common['Authorization'] = 'Token token=' + response.data.apiToken
        this.goToListView()
      })
      .catch(error => {
        alert(error)
      })
    },
    goToListView () {
      let routeOptions = {
        name: 'ListView'
      }
      router.push(routeOptions)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
