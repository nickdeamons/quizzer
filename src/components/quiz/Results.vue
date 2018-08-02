<template>
  <div class="results">
    <h2>Your Results!</h2>
    <div class="question__text">You scored, {{percentage}}%.</div>
    <div v-if="percentage < 33" class="question__text">
      That was crap!<br /> <button @click="reset" class="button prev">Take the quiz again</button>
    </div>
    <div v-if="33 <= percentage && percentage < 70" class="question__text">
      You did didn't pass the class. Please review the ones you got wrong...
    </div>
    <div v-if="percentage >= 70 && percentage < 80" class="question__text">
      You passed the class, but you can do better!
    </div>
    <div v-if="percentage >= 80" class="question__text">
      Solid work.
    </div>
    <div v-for="question in questions" :key="`q_${question.questionId}`" class="results__item question">
      <div v-html="question.body" class="question__text" />
      <div v-html="question.response" class="question__text" :class="{'correct': question.correct, 'incorrect':!question.correct}" />
    </div>
    <button @click="reset" class="button prev">Take the quiz again</button>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'

import store from '../../store'

export default {
  computed: {
    ...mapGetters(['questions', 'percentage'])
  },
  methods: {
    reset: function() {
      store.dispatch('reset')
      this.$router.push('quiz')
    }
  }
}
</script>

<style>

</style>
