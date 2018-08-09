<template>
  <div>
    <div v-html="question.body" class="question__text" />
    <div class="">
      <draggable class="match-table " v-model="list" :options="{group:'choices', disabled: correct}" @start="drag=true" @end="drag=false">
        <div class="match-table__column question__choice" v-for="(option, index) in list" :key="`o_${index}`">
          <span v-html="option" />
        </div>
      </draggable>
    </div>
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
  data: function () {
    return {
      list: [],
      correct: false,
      answered: false,
    }
  },
  mounted: function() {
    this.question.options.forEach((element) => {
      this.list.push(element[0])
      this.list.push(element[1])
    })
    this.list = shuffle([].concat(this.list))
  },
  methods: {
    onUpdate: function (event) {
      const old = event.oldIndex,
      now = event.newIndex;
      this.list.splice(now, 0, this.list.splice(old, 1)[0]);
    },
    compare: function(a, b) {
      if(b.includes(a[0]) && b.includes(a[1])){
        return true
      } else {
        return false
      }
    },
    isCorrect: function() {
      let is = true
      this.answered = true;
      store.dispatch('quiz/answer', this.question.questionId)
      const matchBy = []
      for(let i = 0; i < this.question.options.length && is; i++) {
        for(let j = 0; j< this.list.length; j++) {
          matchBy.push([this.list[j], this.list[j+1]])
          j++
        }
        const matchFound = this.question.options.findIndex((element) => {
          return this.compare(element, matchBy[i])
        })
        if(matchFound == -1) {
          is = false
        }
      }
      this.correct = is;
      if(this.correct) {
        store.dispatch('quiz/correctAnswer', this.question.questionId)
      }
    },
  }
}
</script>