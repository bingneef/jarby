<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
require('milligram/dist/milligram.css')

export default {
  name: 'app'
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
