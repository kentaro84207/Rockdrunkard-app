<template>
  <v-container>
    <v-layout>
      <v-flex xs12 md4>
        <v-select
          item-text="label"
          item-value="value"
          :items="difficulties"
          v-model="problem.difficulty"
          label="グレード"
        ></v-select>
        <div @click="addProblem()">ADD</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Problem } from '~/types/problem'
import firestore from '~/plugins/firestore'

@Component({
  layout: 'admin',
  components: {}
})
export default class AdminProblems extends Vue {
  difficulties: object[] = [
    { label: "7級以下", value: 0 },
    { label: "6級", value: 1 },
    { label: "5級", value: 2 },
    { label: "4級", value: 3 },
    { label: "3級", value: 4 },
    { label: "2級", value: 5 },
    { label: "1級", value: 6 },
    { label: "初段以上", value: 7 },
  ]

  problem: Problem = {
    difficulty: 0,
    month: 8,
    pid: 9999,
    setted_by: "Sharma",
    redpoint_users: null,
  }

  addProblem() {
    firestore.collection('problems').add(this.problem);
  }
}
</script>
