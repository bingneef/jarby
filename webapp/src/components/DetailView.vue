<template>
  <div class="detail-view">
    <h1>Detail</h1>
  </div>
</template>

<script>

export default {
  name: 'detail-view',
  props: ['id'],
  mounted () {
    console.log(this.id)
  },
  beforeRouteEnter (to, from, next) {
    console.log(to, from, next)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

</style>
