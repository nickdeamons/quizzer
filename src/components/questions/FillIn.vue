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
    <div v-if="answered" class="question__text">
      <div v-if="correct" class="correct">
        Correct!
      </div>
      <div v-else class="incorrect">
        Incorrect: <span v-html="question.response" />
      </div>
    </div>
  </div>
</template>

<script>
import AnswerButton from '../buttons/AnswerButton.vue'
import store from '../../store'

export default {
  components: {
    'answer-button': AnswerButton
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
      store.dispatch('answer', this.question.questionId)
      // check all teh accepted terms in the dictionary, ignoring case
      is = (this.accepted.findIndex((value) => { return value.toLowerCase() == this.guess.toLowerCase()}) >= 0);
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
