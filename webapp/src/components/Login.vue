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

    <div
      class="loginButtonRow">
      <button
        class="button button-outline"
        v-on:click="signUp">Sign up
      </button>

      <button
        id="loginButton"
        class="button"
        v-on:click="loginUser">Login
      </button>
    </div>

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
        let apiToken = response.data.apiToken
        localStorage.setItem('apiToken', apiToken)
        axios.defaults.headers.common['Authorization'] = 'Token token=' + apiToken
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
    },
    signUp () {
      let routeOptions = {
        name: 'SignUpView'
      }
      router.push(routeOptions)
    }
  }
}
</script>

<style lang="sass" scoped>
  .loginButtonRow
    display: flex
    justify-content: flex-end
  #loginButton
    margin-left: 12px
</style>
