<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div v-if="user">{{ user }}</div>
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
}
</script>
