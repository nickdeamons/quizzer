import Vue from 'vue'
import App from './App.vue'
import Login from './components/Login'
import Signup from './components/Signup'
import Sortable from 'vue-sortable'
import VueRouter from 'vue-router'
import QuizApp from './components/QuizApp'
import Results from './components/Results'

import firebase from 'firebase'

Vue.config.productionTip = false

Vue.use(Sortable);
Vue.use(VueRouter);

const routes = [
  // { path: '/', redirect: '/', alias: '/question/:id' },
  // { name: 'question', path: '/question/:id', component: App }
  { name: 'login', path: '/login', component: Login },
  { name: 'signup', path: '/signup', component: Signup },
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
  //eslint-disable-next-line 
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('login')
  else if(!requiresAuth && currentUser) next('quiz')
  else next()
})

const config = {
  apiKey: "AIzaSyAguPCIxUUrToYksTf1dwy3IJ5_lu1Qvnw",
  authDomain: "intense-heat-3679.firebaseapp.com",
  databaseURL: "https://intense-heat-3679.firebaseio.com",
  projectId: "intense-heat-3679",
  storageBucket: "intense-heat-3679.appspot.com",
  messagingSenderId: "266803128668"
};

firebase.initializeApp(config);
// firebase.auth().onAuthStateChanged(function (user))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
