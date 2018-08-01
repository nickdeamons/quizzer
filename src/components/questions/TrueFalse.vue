<template>
  <div>
    <div class="question__text"><strong>True</strong> or <strong> False</strong></div>
    <div class="question__text">
      <div v-html="question.body" />
      <input type="radio" :value="true" v-model="selectedChoice" :disabled="correct" /> True<br />
      <input type="radio" :value="false" v-model="selectedChoice" :disabled="correct" /> False
    </div>
    <div v-if="!correct">
      <answer-button :submit="isCorrect" />
    </div>
    <response :answered="answered" :correct="correct" :question="question" />
  </div>
</template>
<script>
import AnswerButton from '../buttons/AnswerButton.vue'
import store from '../../store'
import response from 'Response.vue'

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
      selectedChoice: null,
      correct: false,
      answered: false
    }
  },
  methods: {
    isCorrect: function() {
      // eslint-disable-next-line
      this.answered = true;
      this.correct = (this.selectedChoice === this.question.answer);
      store.dispatch('answer', this.question.questionId)
      if(this.correct) {
        store.dispatch('correctAnswer', this.question.questionId)
      }
    }
  }
}
</script>

<style>

</style>


