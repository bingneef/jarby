<template>
  <section class="list-view">
    <div class="recipe-line" v-for="recipe in recipes" v-on:click="gotoRecipe(recipe.guid)">
      <span class="recipe-title">{{recipe.title}}</span>
      <span class="recipe-action"><i class="fa fa-chevron-right"></i></span>
    </div>

    <button
      class="button button-outline"
      v-on:click="gotoAddRecipe">Add
    </button>
  </section>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'list-view',
  data () {
    return {
      recipes: []
    }
  },
  methods: {
    gotoAddRecipe () {
      let routeOptions = {
        name: 'AddView'
      }
      router.push(routeOptions)
    },
    gotoRecipe (guid) {
      let routeOptions = {
        name: 'DetailView',
        params: {
          guid: guid
        }
      }
      router.push(routeOptions)
    }
  },
  beforeRouteEnter (to, from, next) {
    axios.get('/api/v1/recipes').then(response => {
      next(vm => {
        vm.recipes = response.data
      })
    })
  }
}
</script>

<style lang="sass" scoped>
@import '../stylesheets/vars'
.recipe-line
  padding: $dimension-space
  border-bottom: 1px solid $color-divider
  display: flex
  flex-direction: row
  align-items: center
  cursor: pointer

  &:hover
    background: #FAFAFA
  .recipe-title
    flex: 1
.button.button-outline
  position: fixed
  bottom: 0
  right: $dimension-space
</style>
