<template>
  <section>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'recipe-view',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  beforeRouteUpdate (to, from, next) {
    const toDepth = this.unifyPath(to.path).split('/').length
    const fromDepth = this.unifyPath(from.path).split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
  },
  methods: {
    unifyPath (path) {
      if (path[path.length - 1] !== '/') {
        return path + '/'
      }
      return path
    }
  }
}
</script>
<style lang="sass">
section
  position: relative
  height: 100%

.slide-left-enter-active, .slide-right-enter-active, .slide-left-leave-active, .slide-right-leave-active
  transition: all 0.5s

.slide-left-enter, .slide-right-leave-to
  transform: translateX(100%)
</style>
