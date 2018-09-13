<template>
  <div>
    <div v-if="answered" class="question__text">
      <div v-if="correct" class="correct">
        <div><strong>Correct!</strong></div>
        <div v-html="question.response" />
      </div>
      <div v-else class="incorrect">
        <div><strong>Incorrect!</strong></div>
        <sdiv v-html="question.response" />
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