// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.0.114:5000'

// Add a response interceptor

axios.interceptors.response.use((response) => {
  console.log(response.status)
  return response
}, (error) => {
  if (error.response.status === 401) {
    let routeOptions = {
      name: 'Login'
    }
    router.push(routeOptions)
    return
  }
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
