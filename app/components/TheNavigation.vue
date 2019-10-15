<template>
  <v-bottom-navigation :value="bottomNav" grow fixed color="primary">
    <v-btn color="white" value="list" to="/" nuxt>
      <span>課題</span>
      <v-icon>view_headline</v-icon>
    </v-btn>
    <v-btn color="white" value="ranking" to="/ranking" nuxt>
      <span>順位</span>
      <v-icon>trending_up</v-icon>
    </v-btn>
    <v-btn color="white" value="mypage" to="/mypage" nuxt>
      <span>マイページ</span>
      <v-icon>account_circle</v-icon>
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
