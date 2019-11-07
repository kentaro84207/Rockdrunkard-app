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
                <v-list-item-title class="text-right">{{ user.nickname }}</v-list-item-title>
              </v-flex>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-flex xs6 mb-0>
                <v-list-item-title>
                  現在のポイント
                  <v-icon @click="updatePoint" id="rotate" class="icon">autorenew</v-icon>
                </v-list-item-title>
              </v-flex>
              <v-flex xs6>
                <v-list-item-title class="text-right">{{ point }}</v-list-item-title>
              </v-flex>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-flex xs12 mb-0>
                <v-list-item-title class="text-right caption">
                  <nuxt-link to="/others">その他</nuxt-link>
                </v-list-item-title>
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
  mounted(): void {
    const icon = document.getElementById('rotate')
    icon.addEventListener('click', () => {
      icon.classList.add('-clicked')
      setTimeout(() => {
        icon.classList.remove('-clicked')
      }, 500);
    })
  }

  private get user() {
    try {
      return this.$store.state.user.user
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

  updatePoint() {
    this.$store.dispatch('user/updateUserPoint', this.user.uid)
  }
}
</script>

<style lang='scss' scoped >
.icon {
  font-size: 20px;
  margin-bottom: 3px;
  margin-left: 8px;
}

#rotate {
  transition: 0s;
  &.-clicked {
    transform: rotate(360deg);
    transition: 0.5s;
  }
}
</style>
