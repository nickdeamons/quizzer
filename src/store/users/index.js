const actions = {
  login({
    commit
  }, user) {
    commit('LOGIN', user)
  } 
}

const mutations = {
  LOGIN(state, user) {
    state.currentUser = user
    // state.authenticated = true
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