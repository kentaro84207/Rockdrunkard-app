<template>
  <v-container>
    <v-layout>
      <v-flex xs12 md3 mr-3>
        <v-select
          :items="nums"
          v-model="num"
          label="課題番号"
        ></v-select>
      </v-flex>
      <v-flex xs12 md3 mr-3>
        <v-text-field
        v-model="year"
        label="年"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md3 mr-3>
        <v-select
          :items="months"
          v-model="month"
          label="月"
        ></v-select>
      </v-flex>
      <v-flex xs12 md3 mr-3>
        <v-select
          item-text="label"
          item-value="value"
          :items="difficulties"
          v-model="difficulty"
          label="難易度"
        ></v-select>
      </v-flex>
      <v-flex xs12 md3 mr-3>
        <v-text-field
        v-model="setted_by"
        label="セッター"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md4>
        <div class="cursor" @click="addProblem()">ADD</div>
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

  num: number = null
  nums: number[] = [...Array(100).keys()].map(i => ++i)
  difficulty: number = null
  // TODO: 日付関連共通化
  today = new Date()
  year: number = this.today.getFullYear()
  month: number = this.today.getMonth()
  months: number[] = [...Array(12).keys()].map(i => ++i)
  setted_by:string = null
  pid:number = Date.now()

  addProblem() {
    const problem: Problem = {
      num: Number(this.num),
      difficulty: this.difficulty,
      year: this.year,
      month: this.month,
      pid: this.pid,
      setted_by: this.setted_by,
      redpoint_users: null,
    }
    firestore.collection('problems').add(problem)
    this.$router.replace('/admin/')
  }
}
</script>
