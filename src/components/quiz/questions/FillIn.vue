<template>
  <div>
    <div v-html="question.body" class="question__text" />
    <div class="question__text">
      <div v-if="question.dictionary[0].length > 75">
        <textarea rows="4" v-model="guess" :disabled="correct" />
      </div>
      <input v-else type="text" v-model="guess" :disabled="correct" />
    </div>
    <div v-if="!correct">
      <answer-button :submit="isCorrect" />
    </div>
    <response :answered="answered" :correct="correct" :question="question" />
  </div>
</template>

<script>
import AnswerButton from '../../buttons/AnswerButton.vue'
import response from './Response.vue'
import store from '../../../store'

export default {
  components: {
    'answer-button': AnswerButton,
    response
  },
  props: {
    question: Object,
    correctAnswer: Function
  },
  data: function() {
    return {
      guess: '',
      correct: false,
      answered: false,
    }
  },
  computed: {
    accepted: function() {
      return this.question.dictionary
    }
  },
  methods: {
    isCorrect: function() {
      let is = false;
      this.answered = true;
      store.dispatch('quiz/answer', this.question.questionId)
      // check all the accepted terms in the dictionary, 0 or > = found in the 'dictionary'
      is = (this.accepted.findIndex((value) => {
        // ignoring case, ignoring spaces and punctuation
        return value.toLowerCase().replace(/[.,/?#!$%^&*;:{}=\-_`~()]/g,"").replace(/\s+/g, '') == this.guess.toLowerCase().replace(/[.,/?#!$%^&*;:{}=\-_`~()]/g,"").replace(/\s+/g, '')
        }) >= 0);
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
