<template>
  <v-app>
    <template v-if="user">
      <nuxt />
      <TheNavigation />
    </template>
    <template v-else>
      <v-layout column justify-center align-center>
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </v-layout>
    </template>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TheNavigation from '~/components/TheNavigation.vue'

@Component({
  components: {
    TheNavigation
  }
})
export default class Posts extends Vue {
  private get user() {
    try {
      return this.$store.state.user.user
    } catch (error) {
      return false
    }
  }
}
</script>
