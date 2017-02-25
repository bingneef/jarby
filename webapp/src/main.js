// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.headers.common['Authorization'] = 'Token token=WLEQXlRJtHIHnqCDYqW267Dp'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
