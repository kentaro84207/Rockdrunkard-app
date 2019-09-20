<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout px-3 pb-12>
        <h1 class="display-3 font-weight-black white--text">
          Rock<br>
          Drunkard<br>
          APP
        </h1>
      </v-layout>
      <v-col cols="12" sm="6" class="pt-0 pb-1">
        <v-text-field solo v-model="email" :rules="emailRules" label="E-mail" color="white" background-color="white" required></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="pt-0 pb-0">
        <v-text-field
          solo
          color="white"
          background-color="white"
          v-model="password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :rules="[passwordRules.required, passwordRules.min]"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-2"
          label="Password"
          hint="At least 8 characters"
          class="input-group--focused"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="pt-0 pb-8">
        <v-btn large depressed color="accent" width="100%" height="50" class="font-weight-bold black--text" @click="signin()">ログイン</v-btn>
      </v-col>
      <v-divider class="white"></v-divider>
      <v-col cols="12" sm="6" class="pt-8">
        <v-btn large depressed color="white" width="100%" height="50" class="font-weight-bold" to="/auth/signup">新規登録</v-btn>
        <!-- <nuxt-link to="/auth/signup">Sign Up</nuxt-link> -->
      </v-col>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebaseAuth } from '~/plugins/firebase'
import { User } from '@firebase/auth-types'

@Component({
  layout: 'auth',
  components: {}
})
export default class login extends Vue {
  valid: boolean = false
  email: string = ''
  password: string = ''
  showPassword: boolean = false
  passwordRules: any = {
    required: value => !!value || 'Required.',
    min: v => v.length >= 8 || 'Min 8 characters'
  }
  emailRules: any = [
    v => !!v || 'E-mail is required',
    v => /.+@.+/.test(v) || 'E-mail must be valid'
  ]

  async signin() {
    try {
      await firebaseAuth.signInWithEmailAndPassword(this.email, this.password)
      this.$router.replace('/')
    } catch (error) {
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
