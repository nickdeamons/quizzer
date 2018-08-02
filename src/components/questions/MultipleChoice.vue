<template>
  <div>
    <div class="question__text" >
      <div v-html="question.body" class="question__text"  />
      <div v-for="(option, index) in shuffled" :key="`o_${index}`" class="question__choice">
        <input type="checkbox" :value="option.text" v-model="selectedChoices" :disabled="correct" />
        <span v-html="option.text" />
      </div>
    </div>
    <div v-if="!correct">
      <answer-button :submit="isCorrect" />
    </div>
    <response :answered="answered" :correct="correct" :question="question" />
  </div>
</template>
<script>
import AnswerButton from '../buttons/AnswerButton.vue'
import response from './Response.vue'
import shuffle from '../../utils/shuffle'
import store from '../../store'

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
      selectedChoices: [],
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
    }
  },
  methods: {
    isCorrect: function() {
      let is = true;
      this.answered = true;
      store.dispatch('answer', this.question.questionId)
      if(this.selectedChoices.length !== this.correctChoices.length) {
        is = false;
      } else {
        this.correctChoices.forEach((value) => {
          if(this.selectedChoices.findIndex((choiceValue) => {
            return value.text == choiceValue 
          }) == -1) {
            is = false;
          }
        })
      }
      this.correct = is;
      if(this.correct) {
        store.dispatch('correctAnswer', this.question.questionId)
      }
    }
  }
}
</script>

<style>

</style>


