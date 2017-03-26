<template>
  <div class="header">
    <section class="container">
      <h1 class="title">RecipeBook</h1>
      <button
        class="button button-outline"
        v-on:click="toProfile">Profile
      </button>
    </section>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'app-header',

  methods: {
    toProfile () {
      let routeOptions = {
        name: 'ProfilePage'
      }
      router.push(routeOptions)
    }
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

  .title
    display: inline
    font-size: 2.6rem
    line-height: 5.2rem
    padding: 0
    text-decoration: none
    letter-spacing: 0

  .button.button-outline
    position: fixed
    top: 6px
    right: 12px

</style>
