<template>
  <div class="list-view">
    <h1>{{ title }}</h1>
    <div v-for="recipe in recipes">
      {{recipe.title}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'list-view',
  data () {
    return {
      title: 'ListView',
      recipes: []
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

</style>
