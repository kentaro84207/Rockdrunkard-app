<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div>{{ user }}</div>
      <div @click="signOut()">Sign Out</div>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Top extends Vue {
  private get user() {
    try {
      return this.$store.state.auth.user.displayName
    } catch (error) {
      return false
    }
  }

  async signOut() {
    try {
      await this.$store.dispatch('auth/signOut')
      this.$router.replace('/')
    } catch (error) {
      console.log('Sign Out error', error)
    }
  }
}
</script>
