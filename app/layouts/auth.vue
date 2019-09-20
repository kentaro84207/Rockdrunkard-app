<template>
  <v-app>
    <v-content class="primary">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class AuthLayout extends Vue {}
</script>
