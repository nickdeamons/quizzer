<template>
  <div id="app">
    <h1>Quizzer</h1>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

import './assets/styles.scss'
import store from './store'

export default {
  name: 'app',
  store,
  mounted: function(){
    // store.dispatch('populate')
    this.$router.push('/login')
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
