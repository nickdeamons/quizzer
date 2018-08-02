<template>
  <div>
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
export default {
  props: {
    answered: Boolean,
    correct: Boolean,
    question: Object
  }
}
</script>