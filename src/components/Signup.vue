<template>
  <div class="sign-up">
    <p>Let's make a new account!</p>
    <input type="text" placeholder="Email" v-model="email" /><br />
    <input type="password" placeholder="Password" v-model="password" /><br />
    <button class="login">Sign Up</button><router-link class="button back" to="/login">Back</router-link>
  </div>
</template>

<script>

import firebase from 'firebase'

export default {
  name: 'signUp',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  methods:{
    signUp: function() {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(
          function (user) {
            //eslint-disable-next-line
            alert(`You ${user} are created!`)
          }, 
          function (err) {
            //eslint-disable-next-line
            alert(`Oops. ${err}`)
          }
        )
    }
  }
}
</script>

<style>

</style>
