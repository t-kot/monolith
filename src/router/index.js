import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import Top from '@/components/Top'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Top',
      component: Top,
    }
  ]
})
