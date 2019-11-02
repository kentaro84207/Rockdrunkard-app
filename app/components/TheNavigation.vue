<template>
  <v-layout>
    <v-bottom-navigation :value="bottomNav" grow fixed height="70" color="primary">
      <v-btn color="white" value="list" to="/" class="pb-2" nuxt>
        <span>課題</span>
        <v-icon>view_headline</v-icon>
      </v-btn>
      <v-btn color="white" value="ranking" to="/ranking" class="pb-2" nuxt>
        <span>順位</span>
        <v-icon>trending_up</v-icon>
      </v-btn>
      <v-btn color="white" value="mypage" to="/mypage" class="pb-2" nuxt>
        <span>マイページ</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <!-- <v-btn fixed dark fab bottom right color="pink" class="mb-12" @click="refresh" v-if="path">
      <v-icon>refresh</v-icon>
    </v-btn> -->
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class navigation extends Vue {
  bottomNav: string = 'list'

  // refresh() {
  //   location.reload(true)
  // }

  private get path() {
    return this.$route.path !== '/'
  }
}
</script>
