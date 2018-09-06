<template>
  <div>
    <div v-html="question.body" class="question__text" />
    <div class="question__text">
      <div v-for="i of question.min" :key="`guess${i}`">
        <input  type="text" v-model="guesses[i]" :disabled="correct" /><br />
      </div>
    </div>
    <div v-if="!correct">
      <answer-button :submit="isCorrect" />
    </div>
    <!-- < response :answered="answered" :correct="correct" :question="question" -->
    <div v-if="answered">
      <div v-if="correct" class="correct">
        Correct!
      </div>
      <div v-else class="incorrect">
        Incorrect!
      </div>
      <div >
        <span v-for="(option, index) in accepted" :key="`o_${index}`" >
          <span :class="{'correct': correct, 'incorrect': !correct}" v-if="guessed.indexOf(option.replace(/\s+/g, ''))>=0">{{option}}</span>
          <span v-else :class="{'correct': correct, 'incorrect': !correct}" class="faded" ><small>{{option}}</small></span>
          <br />
        </span>
      </div>
    </div>
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
      guesses: [],
      correct: false,
      answered: false,
      numCorrect: 0
    }
  },
  computed: {
    accepted: function() {
      return this.question.dictionary
    },
    threshold: function() {
      return this.question.min
    },
    guessed: function() {
      return this.guesses.map((value) => {return value.toLowerCase().replace(/\s+/g, '');});
    }
  },
  methods: {
    isCorrect: function() {
      let is = false;
      this.answered = true;
      
      store.dispatch('quiz/answer', this.question.questionId)
      const intersection = this.accepted.filter(element => this.guessed.includes(element.toLowerCase().replace(/\s+/g, '')));

      // check all the accepted terms in the dictionary, 0 or > = found in the 'dictionary'
      /*
      is = (this.accepted.findIndex((value) => {
        // ignoring case, ignoring spaces and punctuation
        // take 80% of correct characters in the string
        const a = value.toLowerCase().replace(/[.,/?#!$%^&*;:{}=\-_`~()]/g,"").replace(/\s+/g, '')
        const b = this.guess.toLowerCase().replace(/[.,/?#!$%^&*;:{}=\-_`~()]/g,"").replace(/\s+/g, '')

        return stringSimilarity.compareTwoStrings(a, b) > 0.85
        }) >= 0);
      this.correct = is;
      */
      is = (intersection.length >= this.threshold);
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
