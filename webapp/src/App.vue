<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
    <a class="button" href="#"><i class="fa fa-times"></i>Default Button</a>
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

  @import './stylesheets/theme_overrides.sass'
  @import './stylesheets/vars.sass'
  @import './stylesheets/mixins.sass'

  $fa-font-path: "~font-awesome/fonts"
  @import "~font-awesome/scss/font-awesome"
</style>
