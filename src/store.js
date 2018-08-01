import Vue from '../node_modules/vue';
import Vuex from '../node_modules/vuex';
// import shuffle from './utils/shuffle';
import firebase from 'firebase'
import quizModule from 'store/quiz'
//
const config = {
  apiKey: "AIzaSyAguPCIxUUrToYksTf1dwy3IJ5_lu1Qvnw",
  authDomain: "intense-heat-3679.firebaseapp.com",
  databaseURL: "https://intense-heat-3679.firebaseio.com",
  projectId: "intense-heat-3679",
  storageBucket: "intense-heat-3679.appspot.com",
  messagingSenderId: "266803128668"
};

firebase.initializeApp(config);


const axios = require('axios');

Vue.use(Vuex)

const getters = {
  loaded: (state) => {
    return state.loaded
  }
}
const mutations = {
  LOADED (state) {
    state.loaded = true
  }
}
const actions = {
  populate({
    commit
  }) {
    setTimeout(() => {
      axios.get('/data/front-end-quiz.json', {
          responseType: 'json'
        })
        .then((response) => {
          commit('POPULATE', response.data)
          // commit('SHUFFLE')
          commit('LOADED')
        });
    }, 500)
  }
}

export default new Vuex.Store({
  getters,
  mutations,
  actions,
  modules: {
    quiz: quizModule
  },
  state: {
    quiz: {},
    questions: [],
    loaded: false,
    complete: false,
    authenticated: false
  }
})