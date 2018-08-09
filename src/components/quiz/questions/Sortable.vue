<template>
  <div>
    <div v-html="question.body" class="question__text" />
    <draggable class="sortable " v-model="list" :options="{disabled: correct}" @start="drag=true" @end="drag=false">
        <div class="sortable__item question__choice" v-for="(option, index) in list" :key="`o_${index}`">
          <span v-html="option" />
        </div>
    </draggable>
    <div v-if="!correct">
      <answer-button :submit="isCorrect" />
    </div>
    <response :answered="answered" :correct="correct" :question="question" />
  </div>
</template>

<script>

import draggable from 'vuedraggable'
import AnswerButton from '../../buttons/AnswerButton.vue'
import response from './Response.vue'
import shuffle from '../../../utils/shuffle'
import store from '../../../store'

export default {
  components: {
    draggable,
    response,
    'answer-button': AnswerButton
  },
  props: {
    question: Object,
    correctAnswer: Function
  },
  mounted: function() {
    this.question.options.forEach((element) => {
      this.list.push(element)
    })
    this.list = shuffle([].concat(this.list))
  },
  computed: {
    correctOrder: function () {
      return this.question.options
    }
  },
  data: function() {
    return {
      list: [],
      correct: false,
      answered: false
    }
  },
  methods: {
    isCorrect: function () {
      let is = true
      this.answered = true
      // abort as soon as the list is out of order
      for(let i=0; i < this.correctOrder.length && is; i++) {
        is = this.list[i] === this.correctOrder[i]
      }
      this.correct = is
      store.dispatch('quiz/answer', this.question.questionId)
      if(this.correct) {
        store.dispatch('quiz/correctAnswer', this.question.questionId)
      }
      return is
    }
  }
}
</script>

<style>

</style>
