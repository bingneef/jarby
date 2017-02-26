<template>
  <section class="container">
    <label for="firstName">Name</label>
    <input
      name="firstName"
      type="text"
      v-model="user.firstName" />

    <label for="lastName">Last name</label>
    <input
      name="lastName"
      type="text"
      v-model="user.lastName" />

    <label for="email">Email</label>
    <input
      name="email"
      type="text"
      v-model="user.email" />

    <label for="password">Password</label>
    <input
      name="lastName"
      type="password"
      v-model="user.password" />

    <label for="passwordCheck">Password (check)</label>
    <input
      name="passwordCheck"
      type="password"
      v-model="user.passwordCheck" />

    <div
      class="signUpButtonRow">
      <button
        class="button button-outline"
        v-on:click="toLoginView">Back
      </button>

      <button
        class="button"
        v-on:click="signUp">Sign Up
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
    signUp () {
      let params = this.user
      axios.post('api/v1/sign-up', params)
      .then(response => {
        console.log(response)
        this.loginUser()
      })
      .catch(error => {
        alert(error)
      })
    },
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
    toLoginView () {
      let routeOptions = {
        name: 'Login'
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
