<template>
  <div class="login">
    <h3>Sign In</h3>
    <input type="text" placeholder="Email" v-model="email" /><br />
    <input type="password" placeholder="Password" v-model="password" /><br />
    <button class="login" @click="login">Login</button>
    <p>No account? <router-link to="signup">You can create one.</router-link></p>
    <p><small>*Your email address will NOT be used in any communications, analytics, etc. It is only in order to access the material of this quiz application.</small></p>
    <Loader v-if="loginAttempt" />
  </div>
</template>

<script>

import firebase from 'firebase'

import { mapActions } from 'vuex'

import store from '../store'

import Loader from './Loader'

export default {
  name: 'login',
  components: {
    Loader
  },
  data: function() {
    return {
      email: '',
      password: '',
      loginAttempt: false,
    }
  },
  methods:{
    ...mapActions(['login']),
    login: function() {
      //eslint-disable-next-line
      this.loginAttempt = true;
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          (data) => {
            //eslint-disable-next-line
            // console.log('authenticated:', data.user.email)
            // alert(`You ${user} are created!`)
            store.dispatch('users/login', data.user)
            this.$router.replace('/select')
          },
          (err) => {
            this.loginAttempt = false;
            alert(`Oops. ${err}`)
          }
        )
    }
  }
}
</script>

<style>

</style>