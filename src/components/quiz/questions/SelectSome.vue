<template>
  <div class="select-some">
    <div v-html="question.body" class="question__text" />
    <div><small>Select at least <strong>{{numberToGuess}}</strong> choices</small></div>
    <div v-for="(option, index) in shuffled" :key="`o_${index}`" class="question__choice">
        <input type="checkbox" :value="option.text" v-model="selectedChoices" :disabled="correct" />
        <span v-html="option.text" />
    </div>
    <br />
    <div v-if="!correct">
      <answer-button :submit="isCorrect" />
    </div>
    <response :answered="answered" :correct="correct" :question="question" />
  </div>
</template>

<script>

import AnswerButton from '../../buttons/AnswerButton.vue'
import response from './Response.vue'

import shuffle from '../../../utils/shuffle'

import store from '../../../store'
/**/

export default {
  props: {
    question: Object,
    correctAnswer: Function
  },
  components: {
    'answer-button': AnswerButton,
    response
  },
  data: function() {
    return {
      selectedChoice: '',
      correct: false,
      answered: false
    }
  },
  computed: {
    correctChoices: function() {
      return this.question.options.filter((value) => value.correct)
    },
    shuffled: function() {
      return [].concat(shuffle(this.question.options))
    },
    numberToGuess: function() {
      return  Math.ceil(this.correctChoices.length*.75)
    }
  },
  methods: {
    isCorrect: function() {
      let is = false;
      this.answered = true;
      let numCorrect = 0;
      store.dispatch('quiz/answer', this.question.questionId)
      if(!(this.selectedChoices.length >= this.numberToGuess)) {
        is = false;
      } else {
        this.correctChoices.forEach((value) => {
          if(this.selectedChoices.findIndex((choiceValue) => {
            return value.text == choiceValue
          }) >= 0) {
            numCorrect++;
          }
        })
      }
      if(numCorrect >= this.numberToGuess) {
        is = true
      }
      this.correct = is;
      if(this.correct) {
        store.dispatch('quiz/correctAnswer', this.question.questionId)
      }
    }
  }
}
</script>

<style>

</style>
