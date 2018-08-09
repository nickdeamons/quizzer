<template>
  <div class="quiz">
    <timer />
    <div class="percentage" >
      <div class="percentage__mask" :style="{width: `${100 - percentage}%`}">&nbsp;</div>
      <span class="percentage__value" :style="{width: `${percentage}%`}">
        <span :style="{opacity : percentage/100} ">{{ percentage }}%</span>
        </span>
    </div>
    <h2>Question {{ currentQuestion + 1 }}</h2>
    <div class="" style="font-size: 12px; margin-bottom: 1.1em;">
        Question {{ currentQuestion + 1 }} of {{ quizData.length }}
    </div>
     <div class="questions">
      <transition-group name="fade">
        <div v-for="(question, index) in quizData" :key="question + index" v-show="index === currentQuestion" class="question">
          <div v-if="question.type==='fillIn'">
            <fill-in :question="question" :correctAnswer='correctAnswer' />
          </div>
          <div v-if="question.type==='multi'">
            <multiple-choice :question="question" :correctAnswer='correctAnswer' />
          </div>
          <div v-if="question.type==='sort'">
            <drag-and-drop :question="question" :correctAnswer='correctAnswer' />
          </div>
          <div v-if="question.type==='trueFalse'">
            <true-false :question="question" :correctAnswer='correctAnswer' />
          </div>
        </div>
      </transition-group>
     </div>
    <div v-if="!completed" class='flex buttons'>
      <button class='prev' v-on:click="currentQuestion--" :disabled="!currentQuestion > 0" >Previous</button>
      <button class='next' v-on:click="currentQuestion++" :disabled="currentQuestion === (quizData.length - 1)">Next</button>
    </div>
    <jump-links :quiz-data="quizData" :currentQuestion="currentQuestion" :navigate="navigate" />
  </div>
</template>

<script>

import FillIn from './questions/FillIn.vue';
import MultipleChoice from './questions/MultipleChoice.vue';
import DragAndDrop from './questions/DragAndDrop.vue';
import TrueFalse from './questions/TrueFalse.vue';
import Timer from './Timer.vue'
import JumpLinks from './JumpLinks.vue'


export default {
  props: {
    quizData: Array,
    correctAnswer: Function,
    percentage: Number,
    complete: Boolean
  },
  components: {
    'fill-in': FillIn,
    'multiple-choice': MultipleChoice,
    'drag-and-drop': DragAndDrop,
    'true-false': TrueFalse,
    'timer': Timer,
    'jump-links': JumpLinks,
  },
  data: function() {
    return {
      currentQuestion: 0,
      completed: false
    };
  },
  computed: {
    remaining: function() {
      return this.quizData.length - (this.currentQuestion + 1);
    }
  },
  methods: {
    navigate: function(currentQuestion, index) {
      this.currentQuestion = index
    }
  },
  watch: {
    currentQuestion: function(){
      /*
      this.$router.push({
        path: `/quiz/question/${this.currentQuestion + 1}`
      })*/
    }
  },
  mounted: function() {
    if(this.$route.params.id) {
      this.currentQuestion = parseInt(this.$route.params.id) - 1;
    }
    /* else {
      this.$router.push({
        path: `/quiz/question/${this.currentQuestion + 1}`
      }/
    } */
  }
};
</script>
<style>
  .quiz {
    position: relative;
  }
</style>