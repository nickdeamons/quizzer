<template>
  <div id="app">
    <h1>Quizzer</h1>
    <Loader v-if="!loaded" />
    <Quiz :quiz-data="questions" v-if="loaded && !isComplete" :correctAnswer="correctAnswer" :percentage="percentage" />
    <Results v-if="isComplete" :quiz-data="questions" :percentage="percentage" />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import './assets/styles.scss'

import Loader from './components/Loader.vue'
import store from './store'
import Quiz from './components/Quiz.vue'
import Results from './components/Results.vue'
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'app',
  store,
  components: {
    Loader,
    Quiz,
    Results,
    Login,
    Signup
  },
  computed: {
    ...mapGetters(['loaded', 'questions', 'percentage', 'isQuestionCorrect','isComplete'])
  },
  methods: {
    ...mapActions(['populate', 'correctAnswer'])
  },
  mounted: function(){
    store.dispatch('populate')
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 20px;
}



</style>
