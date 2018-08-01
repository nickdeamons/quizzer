import Vue from 'vue'
import App from './App.vue'
import Sortable from 'vue-sortable'
import VueRouter from 'vue-router'


Vue.config.productionTip = false

Vue.use(Sortable);
Vue.use(VueRouter);

const routes = [
  // { path: '/', redirect: '/', alias: '/question/:id' },
  { name: 'question', path: '/question/:id', component: App }
]

const router = new VueRouter(
  {
    base: document.querySelector('#app').getAttribute('data-path') || '/',
    mode: 'history', 
    routes
  }
)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
