<template>
  <div>
    <div class="question__text" >
      <div v-html="question.body" class="question__text"  />
      <div v-for="(option, index) in shuffled" :key="`o_${index}`" class="question__choice">
        <input type="radio" :value="option.text" v-model="selectedChoice" :disabled="correct" />
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
import AnswerButton from '../../buttons/AnswerButton.vue'
import response from './Response.vue'
import shuffle from '../../../utils/shuffle'
import store from '../../../store'

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
    correctChoice: function() {
      return this.question.options.filter((value) => value.correct)[0]
    },
    shuffled: function() {
      return [].concat(shuffle(this.question.options))
    }
  },
  methods: {
    isCorrect: function() {
      let is = false;
      this.answered = true;

      store.dispatch('quiz/answer', this.question.questionId)

      is = this.selectedChoice === this.correctChoice.text

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


