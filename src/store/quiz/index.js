import Vue from 'vue';
import shuffle from '../../utils/shuffle';

// const axios = require('axios');

import {firebaseAction} from 'vuexfire'
import { db} from '../../firebase-config'

const setQuizRef = firebaseAction( ({bindFirebaseRef}, {ref}) => {
  return new Promise((resolve) => {
    bindFirebaseRef('questions', ref, {wait: true, readyCallback: () => {
      resolve()
    }})
  })
})


const getters = {
  questions: (state) => {
    return state.localQuestions
  },
  isComplete: (state) => {
    return state.complete
  },
  percentage: (state) => {
    let score = 0
    if(state.localQuestions) {
      state.localQuestions.forEach((element) => {
        if (element.correct) {
          score++;
        }
      })
      if (score === 0) {
        return 0
      } else {
        return Math.floor(score / state.localQuestions.length * 100)
      }
    }
  },
  selectedQuizId: (state) => {
    return state.selectedQuizId
  }
}

const mutations = {

  POPULATE (state) {
    // eslint-disable-next-line
    // console.log(state, state.questions)
    state.localQuestions = [].concat(state.questions)
    state.localQuestions.forEach((element, index) => {
      Vue.set(element, 'questionId', `q-${index}`)
      Vue.set(element, 'correct', false)
      Vue.set(element, 'answered', false)
    })
  },
  SHUFFLE (state) {
    state.localQuestions = shuffle(state.localQuestions)
  },
  ANSWER(state, questionId) {
    state.localQuestions.forEach((element) => {
      if(element.questionId === questionId) {
        element.answered = true
      }
    });
    // We've answered another question, check if we're done with the quiz
    const isCompleted = state.localQuestions.findIndex((element) => {
      return !element.answered
    });
    if (isCompleted >= 0) {
      state.complete = false
    } else {
      state.complete = true
    }
    //eslint-disable-next-line
    //console.log(isCompleted)
  },
  CORRECT_ANSWER (state, questionId) {
    state.localQuestions.forEach((element) => {
      if(element.questionId === questionId) {
        element.correct = true
      }
    });
  },
  RESET (state) {
    state.localQuestions.forEach((element) => {
      element.correct = false
      element.answered = false
    })
    state.complete = false
  },
  SELECT_QUIZ(state, quizId) {
    state.selectedQuizId = quizId
    this.dispatch('quiz/populate')
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
    this.dispatch('quiz/setQuizRef', db.ref(`quizQuestions/${state.selectedQuizId}`))
      .then(() => {
        commit('POPULATE')
        commit('LOADED', null, {root: true})
        commit('SHUFFLE')
      })
  },
  selectQuiz(
    {commit}, quizId
  ) {
    commit('SELECT_QUIZ', quizId)
  }
}

const state = {
  questions: [],
  localQuestions: [],
  complete: false,
  selectedQuizId: ''
}

export default {
    actions,
    getters,
    mutations,
    state,
    namespaced: true
}