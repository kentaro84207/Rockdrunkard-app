<template>
  <v-form>
    <v-container>
      <v-layout>
        <v-flex xs12 md4>
          <div class @click="signInWithGoogle()">Google</div>
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

  async signInWithGoogle() {
    try {
      await this.$store.dispatch('user/signInWithGoogle')
      this.$router.replace('/')
    } catch (error) {
      console.log('Google Login error', error)
    }
  }
}
</script>
