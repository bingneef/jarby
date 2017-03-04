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

    <div
      class="loginButtonRow">
      <button
        class="button button-outline"
        v-on:click="oauthLogin('facebook')">Facebook
      </button>

      <button
        id="loginButton"
        class="button button-outline"
        v-on:click="oauthLogin('google')">Google
      </button>

      <button
        id="loginButton"
        class="button button-outline"
        v-on:click="oauthLogin('github')">Github
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
        this.setCredentials(apiToken)
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
    oauthLogin (type) {
      let strWindowFeatures = 'scrollbars=yes,width=400,height=800'
      let windowObjectReference = window.open(process.env.SERVER_ORIGIN + '/auth/' + type, 'Oauth', strWindowFeatures)

      let interval = setInterval(() => {
        if (windowObjectReference.closed) {
          window.removeEventListener('message', this.listenToOauthDialog, false)
          clearInterval(interval)
        }
      }, 1000)

      window.addEventListener('message', this.listenToOauthDialog, false)
    },
    listenToOauthDialog (e) {
      if (e.origin !== process.env.SERVER_ORIGIN) {
        return
      }

      let apiToken = e.data.apiToken
      this.setCredentials(apiToken)
      window.removeEventListener('message', this.listenToOauthDialog, false)
      this.goToListView()
    },
    signUp () {
      let routeOptions = {
        name: 'SignUpView'
      }
      router.push(routeOptions)
    },
    setCredentials (apiToken) {
      localStorage.setItem('apiToken', apiToken)
      axios.defaults.headers.common['Authorization'] = 'Token token=' + apiToken
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
