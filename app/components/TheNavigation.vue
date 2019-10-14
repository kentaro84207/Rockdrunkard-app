<template>
  <v-bottom-navigation :value="activeBtn" grow fixed color="primary">
    <v-btn color="white" to="/" nuxt>
      <span>課題</span>
      <v-icon>view_headline</v-icon>
    </v-btn>
    <v-btn color="white" to="/ranking" nuxt>
      <span>順位</span>
      <v-icon>trending_up</v-icon>
    </v-btn>
    <v-btn color="white" to="/setting" nuxt>
      <span>設定</span>
      <v-icon>more_horiz</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class navigation extends Vue {
  activeBtn = 1
}
</script>
