<template>
  <div>
    <h2>Select a Quiz</h2>
    <div v-for="quiz in quizzes" :key="`qz_${quiz.id}`" style="margin-top: 1em;">
      <button @click="selectQuiz(quiz.id)">{{quiz.title}}</button>
    </div>
  </div>
</template>

<script>

import store from '../store'

import {mapGetters} from 'vuex'

export default {
  data: function () {
    return {
      selectedQuiz: ''
    }
  },
  methods: {
    selectQuiz: function(quizId) {
      this.selectedQuiz = quizId
      store.dispatch('selectQuiz', this.selectedQuiz)
      this.$router.push('/quiz')
    }
  },
  computed:{
    ...mapGetters(['quizzes'])
  }
}
</script>

<style>

</style>
