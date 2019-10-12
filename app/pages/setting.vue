<template>
  <v-container fluid grid-list-lg mb-10 pb-12>
    <v-layout row wrap>
      <div @click="signOut()">Sign Out</div>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firestore from '~/plugins/firestore'

@Component({
  components: {}
})
export default class Setting extends Vue {
  async signOut() {
    try {
      await this.$store.dispatch('user/signOut')
      this.$router.replace('/')
    } catch (error) {
      console.log('Sign Out error', error)
    }
  }
}
</script>

<style lang='scss' scoped >
</style>
