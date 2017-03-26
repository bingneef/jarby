<template>
  <div class="header">
    <section class="container">
      <h1 class="title" v-on:click="toRootUrl">RecipeBook</h1>
      <img
        class="profile_page_button"
        v-if="currentUser"
        v-bind:src="currentUser.avatarUrl"
        v-on:click="toProfile"/>
    </section>
  </div>
</template>

<script>
import router from '../router'
import store from '../store'
import axios from 'axios'
export default {
  name: 'app-header',
  computed: {
    currentUser () {
      return store.state.currentUser
    }
  },
  methods: {
    toProfile () {
      let routeOptions = {
        name: 'ProfilePage'
      }
      router.push(routeOptions)
    },
    toRootUrl () {
      let routeOptions = {
        name: 'RootUrl'
      }
      router.push(routeOptions)
    }
  },
  mounted () {
    axios.get('/api/v1/current_user').then(response => {
      store.commit('setCurrentUser', response.data)
    })
  }
}
</script>

<style scoped lang="sass">
  .header
    display: block
    height: 5.2rem
    max-width: 100%
    width: 100%
    background: #f4f5f6
    z-index: 1
    border-bottom: .1rem solid #d1d1d1

    .container
      display: flex
      justify-content: space-between
      align-items: center

    .title
      display: inline
      font-size: 2.6rem
      line-height: 5.2rem
      padding: 0
      text-decoration: none
      letter-spacing: 0
      cursor: pointer
      margin-bottom: 0

    .button.button-outline
      position: fixed
      top: 6px
      right: 12px

    .profile_page_button
      border-radius: 50%
      width: 32px
      height: 32px
      align: right
      cursor: pointer

</style>
