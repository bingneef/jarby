import Vue from 'vue'
import Vuex from 'Vuex'
Vue.use(Vuex)

const state = {
  currentUser: null
}
const getters = {
  getCurrentUser (state) {
    return state.currentUser
  }
}
const actions = {

}
const mutations = {
  setCurrentUser (state, args) {
    state.currentUser = args
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
