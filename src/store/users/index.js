import { moduleMutations } from 'vuexfire'
import { db} from '../../firebase-config'

const getters = {
  currentUser: function(state) {
    return state.currentUser
  }
}

const actions = {
  login({
    commit
  }, user) {
    commit('LOGIN', user)
    this.dispatch('setScoresRef', db.ref(`scores/${state.uid}`))
      .then(() => {
        //eslint-disable-next-line
      })
  },
  logout({
    commit
  }) {
    commit('quiz/RESET', null, {root: true})
    commit('LOGOUT')
  }
}

const mutations = {
  ...moduleMutations,
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
  uid: ''
}

export default {
  actions,
  mutations,
  getters,
  state,
  namespaced: true
}