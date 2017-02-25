<template>
  <div class="header">
    <section class="container">
      <h1 class="title">RecipeBook</h1>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app-header'
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

</style>
