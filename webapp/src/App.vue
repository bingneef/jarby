<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
require('milligram/dist/milligram.css')
import AppHeader from './components/AppHeader'

export default {
  name: 'app',
  components: {
    AppHeader
  }
}
</script>

<style lang="sass">
  .no-scrolling
    overflow: hidden

  html, body, #app
    height: 100%

  @import './stylesheets/theme_overrides.sass'
  @import './stylesheets/vars.sass'
  @import './stylesheets/mixins.sass'

  $fa-font-path: "~font-awesome/fonts"
  @import "~font-awesome/scss/font-awesome"
</style>
