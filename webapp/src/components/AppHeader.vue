<template>
  <div class="header">
    <section class="container">
      <h1 class="title" v-on:click="toRootUrl">RecipeBook</h1>
      <div class="profile-menu"
        v-on:click="togglePopover">
        <div class="popover" v-bind:class="{'popover-active': popoverOpen}" id="popover-grid">
          <ul class="popover-list">
            <li class="popover-item">
              <a
                class="popover-link"
                href="https://milligram.github.io/#getting-started"
                title="Getting Started">Getting Started
              </a>
            </li>
          </ul>
        </div>
        <img
          class="profile_page_button"
          v-if="currentUser"
          v-bind:src="currentUser.avatarUrl"
          v-on:click="toProfile"/>
        </div>
    </section>
  </div>
</template>

<script>
import router from '../router'
import store from '../store'
import axios from 'axios'
export default {
  name: 'app-header',
  data () {
    return {
      popoverOpen: false
    }
  },
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
    },
    togglePopover () {
      this.popoverOpen = !this.popoverOpen
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

    .profile-menu
      position: relative

      .profile_page_button
        border-radius: 50%
        width: 32px
        height: 32px
        align: right
        cursor: pointer

      .popover
        background: #fff
        border: .1rem solid #d1d1d1
        display: none
        border-radius: .4rem
        filter: drop-shadow(0 0 .6rem rgba(0,0,0,.1))
        left: 132%
        min-width: 13.4rem
        position: absolute
        top: 105%
        transform: translateX(-100%)
        z-index: 1000

        &.popover-active
          display: block

      .popover-list
        list-style: none
        margin: 0
        padding: 0

      .popover-item
        margin: 0
        padding: 0

      .popover-link
        border-bottom: .1rem solid #d1d1d1
        color: #606c76
        display: block
        font-size: 1.2rem
        padding: .8rem 2rem
        position: relative
        text-align: center
        text-decoration: none


      .popover:after, .popover:before
         border: solid transparent
         border-color: transparent
         border-width: 1rem
         content: " "
         height: 0
         left: 80%
         pointer-events: none
         position: absolute
         right: 1.7rem
         top: 0
         width: 0

      .popover:after
         border-bottom-color: #fff
         transform: translate(-50%,-100%)

      .popover:before
         border-bottom-color: #d1d1d1
         transform: translate(-50%,-102%)
</style>
