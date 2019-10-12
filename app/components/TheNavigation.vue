<template>
  <v-bottom-navigation :value="bottomNav" grow fixed color="primary">
    <v-btn color="white" value="list" to="/" nuxt>
      <span>Monthly</span>
      <v-icon>view_headline</v-icon>
    </v-btn>
    <!-- <v-btn color="white" value="mypage">
      <span>マイページ</span>
      <v-icon>account_circle</v-icon>
    </v-btn> -->
    <v-btn color="white" value="setting" to="/setting" nuxt>
      <span>設定</span>
      <v-icon>build</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class navigation extends Vue {
  bottomNav: string = 'list'
}
</script>
