<template>
  <center><button @click="logout" class="prev">Logout</button></center>
</template>

<script>

import firebase from 'firebase'

export default {
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style>

</style>
