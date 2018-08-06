<template>
  <div class="logout-button">
    <button @click="logout" class="prev">Logout</button>
  </div>
</template>

<script>

import firebase from 'firebase'

import store from '../store'

// import {mapActions} from 'vuex'


export default {
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        store.dispatch('users/logout')
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style scoped>
  .logout-button {
    margin-top: 1em;
  }
</style>
