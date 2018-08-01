import Vue from '../node_modules/vue';
import Vuex from '../node_modules/vuex';
import shuffle from './utils/shuffle';

const axios = require('axios');

Vue.use(Vuex)

const getters = {
  questions: (state) => {
    return state.quiz.questions
  },
  loaded: (state) => {
    return state.loaded
  },
  isComplete: (state) => {
    return state.complete
  },
  percentage: (state) => {
    let score = 0
    if(state.quiz.questions) {
      state.quiz.questions.forEach((element) => {
        if (element.correct) {
          score++;
        }
      })
      if (score === 0) {
        return 0
      } else {
        return Math.floor(score / state.quiz.questions.length * 100)
      }
    }
  }
}

const mutations = {
  POPULATE (state, quiz) {
    state.quiz = quiz
    state.quiz.questions.forEach((element, index) => {
      Vue.set(element, 'questionId', `q-${index}`)
      Vue.set(element, 'correct', false)
      Vue.set(element, 'answered', false)
    })
  },
  SHUFFLE (state) {
    state.quiz.questions = shuffle(state.quiz.questions)
  },
  LOADED (state) {
    state.loaded = true
  },
  ANSWER(state, questionId) {
    state.quiz.questions.forEach((element) => {
      if(element.questionId === questionId) {
        element.answered = true
      }
    });
    // We've answered another question, check if we're done with the quiz
    if (state.quiz.questions.findIndex((element) => {
      return !element.answered
    }) >= 0) {
      state.complete = false
    } else {
      state.complete = true
    }
  },
  CORRECT_ANSWER (state, questionId) {
    state.quiz.questions.forEach((element) => {
      if(element.questionId === questionId) {
        element.correct = true
      }
    });
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
  },
  answer({
    commit
  }, questionId) {
    commit('ANSWER', questionId)
  },
  correctAnswer({
    commit
  }, questionId) {
    commit('CORRECT_ANSWER', questionId)
  }
}

export default new Vuex.Store({
  getters,
  mutations,
  actions,
  state: {
    quiz: {},
    questions: [],
    loaded: false,
    complete: false
  }
})