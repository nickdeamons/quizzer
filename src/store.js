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
    //eslint-disable-next-line
    console.log('attemped to get', state.quizzes)
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
    // state.scores[scoreIndex] = scoreObject
    //eslint-disable-next-line
    console.log(scoreData) 
    db.ref(`scores/${state.users.uid}/${scoreData.scoreIndex}`).set(scoreData.data)
  },
  ADD_SCORE(state, score) {
    // state.scores.push(score)
    db.ref(`scores/${ state.users.uid}`).push(score)
  }
}


const setQuizzesRef = firebaseAction( ({bindFirebaseRef}, {ref}) => {
  bindFirebaseRef('quizzes', ref)
  // unbindFirebaseRef('quizzes')
})


const setScoresRef = firebaseAction( ({bindFirebaseRef}, {ref}) => {
  return new Promise((resolve) => {
    bindFirebaseRef('scores', ref, {wait: true, readyCallback: () => {
      resolve()
    }})
  })
  // unbindFirebaseRef('quizzes')
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
      // state.scores[updateScoreOfQuiz] = scoreObject
    } else {
      commit('ADD_SCORE', scoreObject)
    }
    // this.dispatch('setScoresRef', state.scores)
    // commit('SCORE', scoreObject, )
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