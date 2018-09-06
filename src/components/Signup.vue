<template>
  <div class="sign-up">
    <div v-if="!success">
      <p class="">Let's make a new account!</p>
      <input type="text" placeholder="Email" v-model="email" /><br />
      <input type="password" placeholder="Password" v-model="password" /><br />
      <button class="login" @click="signUp">Sign Up</button><router-link class="button back" to="/login">Back</router-link>
       <p><small>*Your email address will NOT be used in any communications, analytics, etc. It is only in order to access the material of this quiz application.</small></p>
    </div>
    <div v-else>
      <div >You account for, {{email}} is ready to go!</div>
      <router-link class="button back" to="/login">Back</router-link>
    </div>
  </div>
</template>

<script>

import firebase from 'firebase'

export default {
  name: 'signUp',
  data: function() {
    return {
      email: '',
      password: '',
      success: false
    }
  },
  methods:{
    signUp: function() {
      const self = this
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(
          function () {
            //eslint-disable-next-line
            // alert(`You account for, ${user.user.email} is ready to go!`)
            // self.$router.go('/login')
            self.success = true
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
