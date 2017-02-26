<template>
  <section class="container">
    <div class="action-row">
      <button
        class="button button-outline"
        v-on:click="backToList">Back
      </button>

      <button
        class="button button-outline"
        v-if="viewMode"
        v-on:click="edit">Edit
      </button>

      <button
        class="button button-outline"
        v-else
        v-on:click="save">Save
      </button>
    </div>

    <div
      v-if="viewMode">

      <h1>{{recipe.title}}</h1>
      <h4>{{recipe.description}}</h4>

      <hr>

      <h2>Ingredients</h2>
      <div
        v-html="compiledIngredients"></div>

      <hr>

      <h2>Preparing Method</h2>
      <div
        v-html="compiledPreparingMethod"></div>
    </div>

    <div
      v-else>
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
import marked from 'marked'
import router from '../router'

export default {
  name: 'detail-view',
  props: ['guid'],
  data () {
    return {
      viewMode: true,
      recipe: {}
    }
  },
  computed: {
    compiledIngredients () {
      if (!this.recipe.ingredients) {
        return
      }
      return marked(this.recipe.ingredients, { sanitize: true })
    },
    compiledPreparingMethod () {
      if (!this.recipe.preparingMethod) {
        return
      }
      return marked(this.recipe.preparingMethod, { sanitize: true })
    }
  },
  methods: {
    save () {
      let params = this.recipe
      axios.put('/api/v1/recipes/' + this.recipe.guid, params)
      .then(response => {
        this.recipe = response.data
        this.viewMode = true
      })
      .catch(error => {
        alert(error)
        this.viewMode = true
      })
    },
    edit () {
      this.viewMode = false
    },
    backToList () {
      let routeOptions = {
        name: 'ListView'
      }
      router.push(routeOptions)
    }
  },
  beforeRouteEnter (to, from, next) {
    axios.get('/api/v1/recipes/' + to.params.guid).then(response => {
      next(vm => {
        vm.recipe = response.data
      })
    })
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
