<template>
  <section class="container">
    <div class="action-row">
      <button
        class="button button-outline"
        v-on:click="backToList">Back
      </button>

      <button
        class="button button-outline"
        v-on:click="save">Save
      </button>
    </div>

    <div
      <label for="titleField">Title</label>
      <input
        name="titleField"
        type="text"
        v-model="recipe.title" />

      <label for="descriptionField">Description</label>
      <input
        name="descriptionField"
        type="text"
        v-model="recipe.description" />

      <label for="ingredientsField">Ingredients</label>
      <textarea
        name="ingredientsField"
        v-model="recipe.ingredients"></textarea>

      <label for="preparingMethodField">PreparingMethod</label>
      <textarea
        name="preparingMethodField"
        v-model="recipe.preparingMethod"></textarea>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'add-view',
  data () {
    return {
      recipe: {}
    }
  },
  mounted () {
  },
  methods: {
    save () {
      let params = this.recipe
      axios.post('/api/v1/recipes/', params)
      .then(response => {
        this.recipe = response.data
        this.backToList()
      })
      .catch(error => {
        alert(error)
      })
    },
    backToList () {
      let routeOptions = {
        name: 'ListView'
      }
      router.push(routeOptions)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import '../stylesheets/vars'
section
  margin-top: $dimension-space

  .action-row
    display: flex
    justify-content: space-between

</style>
