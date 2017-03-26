<template>
  <section class="container">
    <div id="profile_page">
      <img id="profile_pic" v-bind:src="currentUser.avatarUrl"/>
      <label for="firstName">First name</label>
      <span>{{ currentUser.firstName }}</span>
      <label for="lastName">Last name</label>
      <span>{{ currentUser.lastName }}</span>
      <label for="email">Email</label>
      <span>{{ currentUser.email }}</span>
      <div id="logout">
        <button
            class="button button-outline"
            v-on:click="logOut">Log Out
        </button>
      </div>
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
  #profile_page {padding-top: 20px;}
  #logout {padding-top: 10px;}
  #profile_pic {height: 128px; width: 128px;}
</style>
