import Vue from '../node_modules/vue';
import Vuex from '../node_modules/vuex';
// import shuffle from './utils/shuffle';
import quiz from './store/quiz'
import users from './store/users'

import {firebaseMutations, firebaseAction} from 'vuexfire'
// const axios = require('axios');

Vue.use(Vuex)

const getters = {
  loaded: (state) => {
    return state.loaded
  }
}
const mutations = {
  ...firebaseMutations,
  LOADED (state) {
    state.loaded = true
  }
}

const setQuizzesRef = firebaseAction( ({bindFirebaseRef}, {ref}) => {
  bindFirebaseRef('quizzes', ref)
  // unbindFirebaseRef('quizzes')
})

const actions = {
  setQuizzesRef,
}

export default new Vuex.Store({
  getters,
  mutations,
  actions,
  modules: {
    quiz,
    users
  },
  state: {
    loaded: false,
    quizzes: []
  }
})