import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

import Sortable from 'vue-sortable'

import VueRouter from 'vue-router'

import Login from './components/Login'
import Signup from './components/Signup'

import QuizApp from './components/quiz/QuizApp'
import Results from './components/quiz/Results'
import Selector from './components/Selector'

Vue.config.productionTip = false

Vue.use(Sortable);
Vue.use(VueRouter);

const routes = [
  { name: 'login', path: '/login', component: Login },
  { name: 'signup', path: '/signup', component: Signup },
  { name: 'selector', path: '/select', component: Selector},
  { name: 'results', path: '/results', component: Results, meta: {requiresAuth: true}},
  { name: 'quiz', path:'/quiz', component: QuizApp, meta: {requiresAuth: true}}
]

const router = new VueRouter(
  {
    base: document.querySelector('#app').getAttribute('data-path') || '/',
    mode: 'history',
    routes
  }
)

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) {
    next('login')
  } else {
    next()
  }
})

// firebase.auth().onAuthStateChanged(function (user))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
