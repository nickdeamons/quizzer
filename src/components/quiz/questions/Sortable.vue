<template>
  <div>
    <div v-html="question.body" class="question__text" />
    <div>
      xx
    </div>
  </div>
</template>

<script>

import AnswerButton from '../../buttons/AnswerButton.vue'
import response from './Response.vue'
import shuffle from '../../../utils/shuffle'
import store from '../../../store'

export default {
  components: {
    'answer-button': AnswerButton,
    response
  },
  data: function() {
    return {
      list: [],
      correct: false,
      answered: false
    }
  },
}
</script>

<style>

</style>
