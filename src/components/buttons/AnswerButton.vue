<template>
  <button class="button answer" @click="submit">Answer</button>
</template>

<script>
export default {
  props: {
    submit: Function
  }
}
</script>