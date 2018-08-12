<template>
  <div>
    <Loader v-if="!loaded" />
    <Quiz :quiz-data="questions" v-if="loaded && !isComplete" :correctAnswer="correctAnswer" :percentage="percentage" />
    <Logout />
  </div>
</template>

<script>

import Loader from '../Loader.vue'
import Logout from '../Logout.vue'

import Quiz from './Quiz.vue'
import Results from './Results.vue'

import {mapGetters, mapActions} from 'vuex'

import store from '../../store'

export default {
  components: {
    Loader,
    Quiz,
    Results,
    Logout
  },
  computed: {
    ...mapGetters('quiz', ['questions', 'percentage', 'isComplete']),
    ...mapGetters(['loaded']),
    loaded: function() {
      return store.state.loaded
    }
  },
  methods: {
    ...mapActions('quiz', ['populate', 'correctAnswer'])
  },
  mounted: function() {
    // store.dispatch('populate')
  },
  watch: {
    isComplete: function(newVal, oldVal) {
      //eslint-disable-next-line
      if(newVal===true || oldVal === true) {
        this.$router.push({
          path: '/results'
        })
      }
    }
  }
}
</script>

<style>

</style>
