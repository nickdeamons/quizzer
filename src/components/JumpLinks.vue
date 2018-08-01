<template>
  <div class="jump-links">
    <small>Jump to:</small>&nbsp;
    <span v-for="(element, index) in quizData" :key="`l_${index}`">
      <span v-if="!element.answered">
        <router-link :class="{'active': currentQuestion===index}" @click.native="navigate(currentQuestion, index)" :to="'/question/'+ (index+1)">{{index + 1}}</router-link>
        </span><span v-else class='router-link-inactive' :class="{'correct': element.correct, 'incorrect': !element.correct}">
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

