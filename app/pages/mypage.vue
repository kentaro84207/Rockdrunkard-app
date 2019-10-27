<template>
  <v-container fluid grid-list-lg mb-10 pb-12>
    <v-layout row wrap>
      <v-flex xs12 sm8 md6>
        <v-list>
          <v-subheader>マイページ</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-flex xs6 mb-0>
                <v-list-item-title>ニックネーム</v-list-item-title>
              </v-flex>
              <v-flex xs6>
                <v-list-item-title class="text-right">{{ user }}</v-list-item-title>
              </v-flex>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-flex xs6 mb-0>
                <v-list-item-title>現在のポイント</v-list-item-title>
              </v-flex>
              <v-flex xs6>
                <v-list-item-title class="text-right">{{ point }}</v-list-item-title>
              </v-flex>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-flex xs12 mb-0>
                <v-list-item-title class="text-right caption"><nuxt-link to="/others">その他</nuxt-link></v-list-item-title>
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
export default class Setting extends Vue {
  private get user() {
    try {
      return this.$store.state.user.user.nickname
    } catch (error) {
      return false
    }
  }

  private get point() {
    try {
      return Math.round(this.$store.state.user.user.point)
    } catch (error) {
      return false
    }
  }
}
</script>

<style lang='scss' scoped >
</style>
