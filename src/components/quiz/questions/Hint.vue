<template>
  <div class="hint">
    <transition name="fade" >
      <div v-if="!revealed" key="showHint">
        <a @click="toggle"><small>Show hint</small></a>
      </div>
      <div v-else key="hintView">
        <div>{{hint}}</div>
        <div><a @click="toggle"><small>Hide</small></a></div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    props: {
      hint: String
    },
    data: function() {
      return {
        revealed: false
      }
    },
    methods: {
      toggle() {
        this.revealed = !this.revealed
      }
    }
  }
</script>
