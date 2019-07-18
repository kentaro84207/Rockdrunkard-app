<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <div>{{ user }}</div>
        <div @click="signOut()">Sign Out</div>
        <v-flex xs12 sm8 md6>
          <ul>
            <li v-for="problem in problems" :key="problem.pid">
              <v-card color="v0" class="white--text">
                <v-layout>
                  <v-flex xs7>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">No.1</div>
                        <div>セッター</div>
                        <div>{{ problem.setted_by }}</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{ problem.difficulty }}</div>
                        <div>完登数</div>
                        <div>10</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pa-3">
                  <div class="test">完登日</div>
                  <div>2019/07/03</div>
                  <v-spacer></v-spacer>
                  <v-checkbox label="完登"></v-checkbox>
                </v-card-actions>
              </v-card>
            </li>
          </ul>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firestore from '~/plugins/firestore'
import { Problem } from '~/types/problem'

@Component({})
export default class Top extends Vue {
  async created() {
    await this.$store.dispatch('problem/getProblems')
  }

  private get user() {
    try {
      return this.$store.state.auth.user.displayName
    } catch (error) {
      return false
    }
  }

  private get problems() {
    try {
      return this.$store.state.problem.problems
    } catch (error) {
      return false
    }
  }

  // async problems() {
  //   await this.$store.dispatch('problem/getProblems')
  // }

  async signOut() {
    try {
      await this.$store.dispatch('auth/signOut')
      this.$router.replace('/')
    } catch (error) {
      console.log('Sign Out error', error)
    }
  }
}
</script>

<style lang='scss' scoped >

</style>
