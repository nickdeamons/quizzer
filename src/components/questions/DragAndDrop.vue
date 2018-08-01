<template>
  <div>
    <div v-html="question.body" class="question__text" />
    <div class="match-table ">
      <draggable class="match-table__column" v-model="list" :options="{group:'choices', disabled: correct}" @start="drag=true" @end="drag=false">
        <div class="question__choice" v-for="(option, index) in list" :key="`o_${index}`">
          <span v-html="option.text" />
        </div>
      </draggable>
      <div class="match-table__column">
        <div v-for="(match, index) in question.matches" :key="`m_${index}`" class="question__choice">
        <span v-html="match.text" /></div>
      </div>
    </div>
    <div v-if="!correct">
      <answer-button :submit="isCorrect" />
    </div>
    <div v-if="answered" class="question__text">
      <div v-if="correct" class="correct">
        Correct! <span v-html="question.response" />
      </div>
      <div v-else class="incorrect">
        Incorrect: <span v-html="question.response" />
      </div>
    </div>
  </div>
</template>

<script>

import shuffle from '../../utils/shuffle'

import AnswerButton from '../buttons/AnswerButton.vue'
import draggable from 'vuedraggable'

import store from '../../store'

export default {
  components: {
    draggable,
    'answer-button': AnswerButton
  },
  props: {
    question: Object,
    correctAnswer: Function
  },
  data: function () {
    return {
      list: [],
      matchList: [],
      correct: false,
      answered: false,
    }
  },
  mounted: function() {
    this.list = shuffle([].concat(this.question.options));
    // this.matchList = shuffle([].concat(this.question.matches));
  },
  methods: {
    onUpdate: function (event) {
      const old = event.oldIndex,
      now = event.newIndex;
      this.list.splice(now, 0, this.list.splice(old, 1)[0]);
    },
    isCorrect: function() {
      let is = true;
      this.answered = true;
      store.dispatch('answer', this.question.questionId)
      for(let i = 0; i < this.question.options.length; i++) {
        if (this.question.options[i] !== this.list[i]) {
          is = false
        }
      }
      this.correct = is;
      if(this.correct) {
        store.dispatch('correctAnswer', this.question.questionId)
      }
    },
  }
}
</script>

<style scoped>
  .match-table {
    display: flex;
    flex-direction: row;
    margin: 0px auto 20px;
  }
  .match-table__rows {
    cursor: pointer;
  }
  .match-table__column {
    display: flex;
    flex-direction: column;
    margin:0;
    padding: 0;
  }
  .match-table__column div{
    display: flex;
    cursor: pointer;
    border-top: 1px solid #222;
    border-left: 1px solid #222;
    border-right: 1px solid #222;
    padding: 0 10px;
  }
  .match-table__column div:last-child {
    border-bottom: 1px solid #222;
  }
  .sortable-ghost {
    opacity: 0.25;
  }
</style>

