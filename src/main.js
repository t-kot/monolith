// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import createStore from './store'
import router from './router'
import * as blockstack from 'blockstack'
require('element-ui/lib/theme-chalk/index.css')
global.blockstack = blockstack

Vue.config.productionTip = false

const store = createStore()
store.dispatch('init')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
