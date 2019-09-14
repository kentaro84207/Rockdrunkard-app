<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>
    <v-layout pa-5>
      <v-flex xs12 md3 mr-3>
        <v-select :items="nums" v-model="num" label="課題番号"></v-select>
      </v-flex>
      <v-flex xs12 md3 mr-3>
        <v-text-field v-model="year" readonly label="年"></v-text-field>
      </v-flex>
      <v-flex xs12 md3 mr-3>
        <v-text-field v-model="month" readonly label="月"></v-text-field>
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
        <v-text-field v-model="setted_by" label="セッター"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-btn class="cursor" @click="closeDialog()">キャンセル</v-btn>
      <v-btn class="cursor" color="primary" @click="registerProblem()">{{ btnText }}</v-btn>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Problem } from '~/types/problem'
import firestore from '~/plugins/firestore'

@Component({
  components: {}
})
export default class ProblemRegisterDialog extends Vue {
  // select項目
  difficulties: object[] = [
    { label: '7級以下', value: 0 },
    { label: '6級', value: 1 },
    { label: '5級', value: 2 },
    { label: '4級', value: 3 },
    { label: '3級', value: 4 },
    { label: '2級', value: 5 },
    { label: '1級', value: 6 },
    { label: '初段以上', value: 7 }
  ]
  nums: number[] = [...Array(200).keys()].map(i => ++i)
  // months: number[] = [...Array(12).keys()].map(i => ++i)

  // 初期化用
  initValue: Problem = {
    num: null,
    difficulty: null,
    year: null,
    month: null,
    pid: null,
    setted_by: null,
    redpoint_users: null
  }

  private get editingProblem() {
    return this.$store.state.admin.editingProblem
  }

  private get editingValue() {
    return Object.assign({}, this.editingProblem, {pid: this.pid, year: this.year, month: this.month})
  }

  private get num() {
    return this.editingValue.num
  }
  private set num(val) {
    this.editingValue.num = val
  }

  private get difficulty() {
    return this.editingValue.difficulty
  }
  private set difficulty(val) {
    this.editingValue.difficulty = val
  }

  private get setted_by() {
    return this.editingValue.setted_by
  }
  private set setted_by(val) {
    this.editingValue.setted_by = val
  }

  private get pid() {
    return this.editingProblem.pid ? this.editingProblem.pid : Date.now()
  }

  private get year() {
    return this.$store.state.admin.setYear
  }

  private get month() {
    return this.$store.state.admin.setMonth
  }

  private get editedPid() {
    return this.$store.state.admin.editedPid
  }

  private get formTitle() {
    return this.editedPid === -1 ? '課題を追加' : '課題を編集'
  }

  private get btnText() {
    return this.editedPid === -1 ? '追加する' : '更新する'
  }

  closeDialog() {
    // 編集項目初期化
    this.$store.dispatch('admin/editingProblem', this.initValue)
    this.$store.dispatch('admin/changeDialogState', 'close')
  }

  registerProblem() {
    const problem: Problem = this.editingValue
    const id: string = `${problem.year}_${problem.month}_${problem.num}`
    firestore
      .collection('problems')
      .doc(id)
      .set(problem)
    this.closeDialog()
    const selectedDate = {
      year: this.year,
      month: this.month
    }
    this.$store.dispatch('admin/fetchProblems', selectedDate)
  }
}
</script>
