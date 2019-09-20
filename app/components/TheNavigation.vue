<template>
  <v-bottom-navigation :value="true" fixed color="primary">
    <v-btn class="mx-6" color="white" value="list">
      <span>List</span>
      <v-icon>view_headline</v-icon>
    </v-btn>

    <v-btn color="white" value="mypage">
      <span>MyPage</span>
      <v-icon>account_circle</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class navigation extends Vue {
  bottomNav: string = 'List'
}
</script>
