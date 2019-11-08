<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>
    <v-layout pa-5>
      <v-flex xs12 md3 mr-3>
        <v-select
          :items="nums"
          :value="isEditing? editingProblem.num : nextProblemNum"
          label="課題番号"
          @input="setValue({target:'num', value:$event})"
        ></v-select>
      </v-flex>
      <v-flex xs12 md3 mr-3>
        <v-text-field :value="year" readonly label="年"></v-text-field>
      </v-flex>
      <v-flex xs12 md3 mr-3>
        <v-text-field :value="month" readonly label="月"></v-text-field>
      </v-flex>
      <v-flex xs12 md3 mr-3>
        <v-select
          item-text="label"
          item-value="value"
          :items="difficulties"
          :value="editingProblem.difficulty"
          label="難易度"
          @input="setValue({target:'difficulty', value:$event})"
        ></v-select>
      </v-flex>
      <v-flex xs12 md3 mr-3>
        <v-text-field
          :value="editingProblem.setted_by"
          label="セッター"
          @input="setValue({target:'setted_by', value:$event})"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout justify-center>
      <v-btn class="cursor ma-3" min-width="100" @click="closeDialog()">キャンセル</v-btn>
      <v-btn
        class="cursor ma-3"
        min-width="150"
        color="primary"
        @click="registerProblem()"
      >{{ btnText }}</v-btn>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Problem } from '~/types/problem'
import firestore from '~/plugins/firestore'
import uuid from 'uuid'

@Component({
  components: {}
})
export default class ProblemRegisterDialog extends Vue {
  // select項目
  nums: number[] = [...Array(200).keys()].map(i => ++i)

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

  // 初期化用
  initProblem: Problem = {
    num: null,
    difficulty: null,
    year: this.year,
    month: this.month,
    pid: null,
    setted_by: null,
    point: 100,
    ascent_users: []
  }

  // 新規・編集用
  private get editingProblem() {
    return this.$store.state.admin.editingProblem
  }

  private get pid() {
    return this.editingProblem.pid ? this.editingProblem.pid : uuid()
  }

  private get year() {
    return this.$store.state.admin.setYear
  }

  private get month() {
    return this.$store.state.admin.setMonth
  }

  private get isEditing() {
    return this.$store.state.admin.editedPid !== '-1'
  }

  private get formTitle() {
    return this.isEditing ? '課題を編集' : '課題を追加'
  }

  private get btnText() {
    return this.isEditing ? '更新する' : '追加する'
  }

  private get nextProblemNum() {
    const problems = this.$store.state.admin.problems
    const num = problems.length + 1
    this.setValue({ target: 'num', value: num })
    return num
  }

  setValue(e) {
    const _obj = { [e.target]: e.value, pid: this.pid }
    const newProblem = Object.assign({}, this.editingProblem, _obj)
    this.$store.dispatch('admin/editingProblem', newProblem)
  }

  closeDialog() {
    // 編集項目初期化
    this.$store.dispatch('admin/editingProblem', this.initProblem)
    this.$store.dispatch('admin/changeDialogState', 'close')
  }

  registerProblem() {
    const problem: Problem = this.editingProblem
    const id: string = `${problem.year}_${problem.month}_${problem.num}`
    firestore
      .collection('problems')
      .doc(id)
      .set(problem)
      .then(() => {
        this.fetchProblems()
      })
      .catch(function(error) {
        console.error('Error writing document: ', error)
      })
    this.closeDialog()
  }

  fetchProblems() {
    const selectedDate = {
      year: this.year,
      month: this.month
    }
    this.$store.dispatch('admin/fetchProblems', selectedDate)
  }
}
</script>
