import Vue from '../node_modules/vue';
import Vuex from '../node_modules/vuex';
// import shuffle from './utils/shuffle';
import quiz from './store/quiz'
import users from './store/users'

import {firebaseMutations, firebaseAction} from 'vuexfire'
// const axios = require('axios');
import {db} from './firebase-config'

Vue.use(Vuex)

const getters = {
  loaded: (state) => {
    return state.loaded
  },
  quizzes: (state) => {
    return state.quizzes
  },
  getQuizById: (state, id) => {
    return state.quizzes.find((element) => {
      return element.id == id
    })
  }
}
const mutations = {
  ...firebaseMutations,
  LOADED (state) {
    state.loaded = true
  },
  UPDATE_SCORE(state, scoreData) {
    db.ref(`scores/${state.users.uid}/${scoreData.scoreIndex}`).set(scoreData.data)
  },
  ADD_SCORE(state, score) {
    db.ref(`scores/${ state.users.uid}`).push(score)
  }
}


const setQuizzesRef = firebaseAction( ({bindFirebaseRef}, {ref}) => {
  bindFirebaseRef('quizzes', ref)
})

const setScoresRef = firebaseAction( ({bindFirebaseRef}, {ref}) => {
  return new Promise((resolve) => {
    bindFirebaseRef('scores', ref, {wait: true, readyCallback: () => {
      resolve()
    }})
  })
})

const actions = {
  setQuizzesRef,
  setScoresRef,
  setScore({
    commit, state,
  }, scoreObject) {
    let updateScoreOfQuiz = state.scores.findIndex((element) => {
      return element.quizId === state.quiz.selectedQuizId
    })
    if(updateScoreOfQuiz >= 0) {
      commit('UPDATE_SCORE', {scoreIndex: state.scores[updateScoreOfQuiz]['.key'], data: scoreObject})
    } else {
      commit('ADD_SCORE', scoreObject)
    }
  }
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
    quizzes: [],
    scores: []
  }
})