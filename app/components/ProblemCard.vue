<template>
  <li class="pb-3">
    <v-card :color="difficultyColor[problem.difficulty]" class="black--text">
      <v-layout>
        <v-flex xs7>
          <v-card-title primary-title class="pl-3 py-2">
            <div>
              <div class="headline">No.{{ problem.num }}</div>
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
        <v-checkbox @click="addSentProblem(problem)" label="完登"></v-checkbox>
      </v-card-actions>
    </v-card>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Problem } from '~/types/problem'

@Component({})
export default class ProblemCard extends Vue {
  @Prop() problem!: Problem[]

  private get difficulty() {
    return this.$store.state.problem.difficulty
  }

  private get difficultyColor() {
    return this.$store.state.problem.difficultyColor
  }

  addSentProblem(problem) {
    this.$store.dispatch('user/addSentProblem', problem)
  }
}
</script>
