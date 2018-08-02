import Vue from '../node_modules/vue';
import Vuex from '../node_modules/vuex';
// import shuffle from './utils/shuffle';
import quiz from './store/quiz'
import users from './store/users'

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
    quiz,
    users
  },
  state: {
    loaded: false
  }
})