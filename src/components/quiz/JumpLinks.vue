<template>
  <div class="jump-links">
    <small>Jump to:</small>&nbsp;
    <span v-for="(element, index) in quizData" :key="`l_${index}`">
      <span v-if="!element.answered">
        <span><a :class="{'active': currentQuestion===index}" @click="navigate(currentQuestion, index)" >{{index + 1}}</a></span>
        </span><span v-else class='inactive' :class="{'correct': element.correct, 'incorrect': !element.correct}">
        <span v-if="element.correct" class="icon icon-check">&nbsp;</span>
        {{index + 1}}
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    quizData: Array,
    currentQuestion: Number,
    navigate: Function
  }
}
</script>

