const actions = {
  login({
    commit
  }, user) {
    commit('LOGIN', user)
  },
  logout({
    commit
  }) {
    commit('RESET')
    commit('LOGOUT')
  } 
}

const mutations = {
  LOGIN(state, user) {
    state.currentUser = user
    // state.authenticated = true
  },
  LOGOUT(state) {
    state.currentUser = null
  }
}

const state = {
  currentUser: {}
}

export default {
  actions,
  mutations,
  state
}