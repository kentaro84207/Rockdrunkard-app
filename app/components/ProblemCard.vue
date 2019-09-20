<template>
  <li class="pb-3">
    <v-card :color="difficultyColor[problem.difficulty]" raised class="black--text">
      <v-layout>
        <v-flex xs3>
          <v-card-title primary-title class="pl-3 py-0 pr-0">
            <div>
              <div class="title">No.{{ problem.num }}</div>
              <div class="body-1">{{ problem.setted_by }}</div>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs5>
          <v-card-title primary-title class="pl-3 py-0">
            <div>
              <div class="title">{{ difficulty[problem.difficulty] }}</div>
              <div class="body-1">完登数：10</div>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs4 pl-0>
          <div class="py-0">
            <v-switch pt-0 color="primary" hide-details class="mt-3" v-model="switch1" :label="labelText"></v-switch>
            <!-- <v-checkbox @click="addSentProblem(problem)" label="完登"></v-checkbox> -->
          </div>
        </v-flex>
      </v-layout>
      <v-divider class="mb-1" light></v-divider>
    </v-card>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Problem } from '~/types/problem'

@Component({})
export default class ProblemCard extends Vue {
  @Prop() problem!: Problem[]

  switch1: boolean = false
  label

  private get difficulty() {
    return this.$store.state.problem.difficulty
  }

  private get difficultyColor() {
    return this.$store.state.problem.difficultyColor
  }

  private get labelText() {
    return this.switch1 ? '完登' : '未完登'
  }

  addSentProblem(problem) {
    // this.$store.dispatch('user/addSentProblem', problem)
    console.log('hello')
  }
}
</script>
<style lang='scss' scoped >
</style>
