<template>
  <v-form>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <input type="text" placeholder="E-mail" v-model="email" />
          <input type="password" placeholder="Password" v-model="password" />
          <button class @click="signinWithEmailAndPassword">Sign in</button>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from '~/plugins/firebase'

@Component({
  layout: 'login',
  components: {}
})
export default class login extends Vue {
  email: string = ''
  password: string = ''

  signinWithEmailAndPassword() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .catch(error => {
        alert(error.message)
      })
  }
}
</script>
