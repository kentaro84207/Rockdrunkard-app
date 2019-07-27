<template>
  <v-form>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          メール<br>
          <input type="text" v-model="email" /><br>
          パスワード<br>
          <input type="password" v-model="password" /><br>
          <div @click="signin()">ログイン</div>
          <nuxt-link to="/auth/signup">Sign Up</nuxt-link>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebaseAuth } from '~/plugins/firebase'
import { User } from '@firebase/auth-types'

@Component({
  layout: 'login',
  components: {}
})
export default class login extends Vue {
  email: string = ''
  password: string = ''

  async signin() {
    try{
      await firebaseAuth.signInWithEmailAndPassword(this.email, this.password)
      this.$router.replace('/')
    } catch(error){
      console.log('Login error', error)
    }
  }

  // async signInWithGoogle() {
  //   try {
  //     await this.$store.dispatch('user/signInWithGoogle')
  //     this.$router.replace('/')
  //   } catch (error) {
  //     console.log('Google Login error', error)
  //   }
  // }
}
</script>
