<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <div>{{ user }}</div>
        <div @click="signOut()">Sign Out</div>
        <v-flex xs12 sm8 md6>
          <ul>
            <li v-for="problem in problems" :key="problem.pid" class="pb-3">
              <v-card :color="difficultyColor[problem.difficulty]" class="black--text">
                <v-layout>
                  <v-flex xs7>
                    <v-card-title primary-title class="pl-3 py-2">
                      <div>
                        <div class="headline">No.{{ String(problem.pid).slice(-2) }}</div>
                        <div>セッター：{{ problem.setted_by }}</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                  <v-flex xs5>
                    <v-card-title primary-title class="pl-3 py-2">
                      <div>
                        <div class="headline">{{ difficulty[problem.difficulty] }}</div>
                        <div>完登人数：10</div>
                      </div>
                    </v-card-title>
                  </v-flex>
                </v-layout>
                <v-divider light></v-divider>
                <v-card-actions class="pl-3 py-0">
                  <!-- <div class="test">完登日</div> -->
                  <!-- <div>2019/07/03</div> -->
                  <!-- <v-spacer></v-spacer> -->
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
  difficulty: { [key: number]: string; } = {
    0: '〜7級',
    1: '6級',
    2: '5級',
    3: '4級',
    4: '3級',
    5: '2級',
    6: '1級',
    7: '初段〜',
  }

  difficultyColor: { [key: number]: string; } = {
    0: 'r0',
    1: 'r1',
    2: 'r2',
    3: 'r3',
    4: 'r4',
    5: 'r5',
    6: 'r6',
    7: 'r7',
  }

  async created() {
    await this.$store.dispatch('problem/getProblems')
  }

  private get user() {
    try {
      return this.$store.state.user.user.displayName
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
      await this.$store.dispatch('user/signOut')
      this.$router.replace('/')
    } catch (error) {
      console.log('Sign Out error', error)
    }
  }
}
</script>

<style lang='scss' scoped >
</style>
