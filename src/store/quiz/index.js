import Vue from 'vue';
import shuffle from '../../utils/shuffle';

// const axios = require('axios');

import {firebaseAction} from 'vuexfire'
import { db} from '../../firebase-config'

const setQuizRef = firebaseAction( ({bindFirebaseRef}, {ref}) => {
  bindFirebaseRef('questions', ref)
  // unbindFirebaseRef('quizzes')
})


const getters = {
  questions: (state) => {
    return state.questions
  },
  isComplete: (state) => {
    return state.complete
  },
  percentage: (state) => {
    let score = 0
    if(state.questions) {
      state.questions.forEach((element) => {
        if (element.correct) {
          score++;
        }
      })
      if (score === 0) {
        return 0
      } else {
        return Math.floor(score / state.questions.length * 100)
      }
    }
  }
}

const mutations = {
  POPULATE (state) {
    // state.questions = questions
    state.questions.forEach((element, index) => {
      Vue.set(element, 'questionId', `q-${index}`)
      Vue.set(element, 'correct', false)
      Vue.set(element, 'answered', false)
    })
  },
  SHUFFLE (state) {
    state.questions = shuffle(state.questions)
  },
  ANSWER(state, questionId) {
    state.questions.forEach((element) => {
      if(element.questionId === questionId) {
        element.answered = true
      }
    });
    // We've answered another question, check if we're done with the quiz
    if (state.questions.findIndex((element) => {
      return !element.answered
    }) >= 0) {
      state.complete = false
    } else {
      state.complete = true
    }
  },
  CORRECT_ANSWER (state, questionId) {
    state.questions.forEach((element) => {
      if(element.questionId === questionId) {
        element.correct = true
      }
    });
  },
  RESET (state) {
    state.questions.forEach((element) => {
      element.correct = false
      element.answered = false
    })
    state.complete = false
  }
}

const actions = {
  setQuizRef,
  answer({
    commit
  }, questionId) {
    commit('ANSWER', questionId)
  },
  correctAnswer({
    commit
  }, questionId) {
    commit('CORRECT_ANSWER', questionId)
  },
  reset({
    commit
  }) {
    commit('RESET')
  },
  populate(
    {commit}
  ) {
    setTimeout(() => {
      this.dispatch('setQuizRef', db.ref('quizQuestions/q0'))
        .then(() => {
          commit('POPULATE')
          commit('LOADED')
        })
      // commit('LOADED') /* */
      /*
      axios.get('/data/front-end-quiz.json', {
          responseType: 'json'
        })
        .then((response) => {
          commit('POPULATE', response.data)
          // commit('SHUFFLE')
          commit('LOADED')
        }); */
    }, 500)
  }
}

const state = {
  questions: [],
  complete: false
}

export default {
    actions,
    getters,
    mutations,
    state
}