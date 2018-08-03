import {firebaseAction} from 'vuexfire'
import { db} from '../../firebase-config'

const getters = {
  currentUser: function(state) {
    return state.currentUser
  }
}

const setScoresRef = firebaseAction( ({bindFirebaseRef}, {ref}) => {
  return new Promise((resolve) => {
    bindFirebaseRef('scores', ref, {wait: true, readyCallback: () => {
      resolve()
    }})
  })
  // unbindFirebaseRef('quizzes')
})

const actions = {
  login({
    commit
  }, user) {
    commit('LOGIN', user)
    this.dispatch('setScoresRef', db.ref(`scores/${state.uid}`))
      .then(() => {
        //eslint-disable-next-line
        console.log('we have settled the scores')
      })
  },
  logout({
    commit
  }) {
    commit('RESET')
    commit('LOGOUT')
  },
  setScoresRef 
}

const mutations = {
  LOGIN(state, user) {
    state.currentUser = user
    // state.authenticated = true
    //eslint-disable-next-line
    state.uid = state.currentUser.uid
  },
  LOGOUT(state) {
    state.currentUser = null
  }
}

const state = {
  currentUser: {},
  uid: '',
  scores: []
}

export default {
  actions,
  mutations,
  getters,
  state
}