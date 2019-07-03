<template>
  <v-form>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <input type="text" placeholder="E-mail" v-model="email" />
          <input type="password" placeholder="Password" v-model="password" />
          <div @click="signupWithEmailAndPassword">Register!</div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from '~/plugins/firebase'

@Component({
  layout: 'login'
})
export default class EmailSignup extends Vue {
  email: string = ''
  password: string = ''

  signupWithEmailAndPassword() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.email, this.password)
      .catch(error => {
        alert(error.message)
        console.log('error')
      })
  }
}
</script>
