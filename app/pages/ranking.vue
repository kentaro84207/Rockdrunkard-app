<template>
  <v-container fluid grid-list-lg mb-12 pb-12>
    <v-layout row wrap>
      <v-flex xs12 sm8 md6>
        <v-list>
          <v-subheader>現在の順位<span class="caption">（ラグがある場合があります）</span></v-subheader>
          <v-list-item v-for="(item, i) in userPoints" :key="item.name">
            <v-list-item-content>
              <v-flex xs3 pa-0>
                <v-list-item-title>{{ i + 1 }}</v-list-item-title>
              </v-flex>
              <v-flex xs6 pa-0>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-flex>
              <v-flex xs3 pa-0>
                <v-list-item-title v-text="Math.round(item.point)" class="text-right"></v-list-item-title>
              </v-flex>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firestore from '~/plugins/firestore'

@Component({
  components: {}
})
export default class Ranking extends Vue {
  created() {
    this.$store.dispatch('ranking/fetchUserPoints')
  }

  private get userPoints() {
    try {
      return this.$store.state.ranking.userPoints
    } catch (error) {
      return false
    }
  }
}
</script>

<style lang='scss' scoped >
</style>
