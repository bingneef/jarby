<template>
  <div id="app">
    <div class="header">
      <app-header></app-header>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
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

<style lang="sass" scoped>
.no-scrolling
  overflow: hidden

@import './stylesheets/theme_overrides.sass'
@import './stylesheets/vars.sass'
@import './stylesheets/mixins.sass'

$fa-font-path: "~font-awesome/fonts"
@import "~font-awesome/scss/font-awesome"

#app
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  display: flex
  flex-direction: column

  .content
    flex: 1
    overflow: scroll

</style>
