<template>
  <v-container fluid grid-list-lg mb-10 pb-12>
    <v-layout row wrap>
      <v-flex xs12 sm8 md6>
        <v-list>
          <v-subheader>その他</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-flex xs12 mb-0>
                <v-list-item-title>
                  <nuxt-link to="/others/privacy">プライバシーポリシー</nuxt-link>
                </v-list-item-title>
              </v-flex>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-flex xs12 mb-0>
                <v-list-item-title>
                  <nuxt-link to="/others/terms">利用規約</nuxt-link>
                </v-list-item-title>
              </v-flex>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-flex xs12 mb-0>
                <v-list-item-title @click="signOut">ログアウト</v-list-item-title>
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
export default class Others extends Vue {
  async signOut() {
    if (confirm('ログアウトしますか？')) {
      try {
        await this.$store.dispatch('user/signOut')
        this.$router.replace('/')
      } catch (error) {
        console.log('Sign Out error', error)
      }
    }
  }
}
</script>

<style lang='scss' scoped >
</style>
