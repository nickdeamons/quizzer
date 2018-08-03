<template>
  <button @click="logout" class="prev">Logout</button>
</template>

<script>

import firebase from 'firebase'

import store from '../store'

// import {mapActions} from 'vuex'


export default {
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        store.dispatch('logout')
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style>

</style>
