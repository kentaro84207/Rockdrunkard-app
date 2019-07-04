<template>
  <v-app>
    <nuxt />
    <TheNavigation />
  </v-app>
</template>

<script>
import TheNavigation from '~/components/TheNavigation.vue'

export default {
  components: {
    TheNavigation
  }
}
</script>
