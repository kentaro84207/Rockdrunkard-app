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
        <v-text-field v-model="year" label="年"></v-text-field>
      </v-flex>
      <v-flex xs12 md3 mr-3>
        <v-select :items="months" v-model="month" label="月"></v-select>
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
      <v-btn class="cursor" color="primary" @click="addProblem()">追加</v-btn>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import { Problem } from '~/types/problem'
import firestore from '~/plugins/firestore'

@Component({
  components: {}
})
export default class ProblemRegisterDialog extends Vue {
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

  num: number = null
  nums: number[] = [...Array(200).keys()].map(i => ++i)
  difficulty: number = null
  months: number[] = [...Array(12).keys()].map(i => ++i)
  setted_by: string = null
  pid: number = Date.now()

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

  closeDialog() {
    this.$store.dispatch('admin/changeDialogState', 'close')
  }

  addProblem() {
    const problem: Problem = {
      num: Number(this.num),
      difficulty: this.difficulty,
      year: this.year,
      month: this.month,
      pid: this.pid,
      setted_by: this.setted_by,
      redpoint_users: null
    }
    const _id: string = `${this.year}_${this.month}_${this.num}`
    firestore
      .collection('problems')
      .doc(_id)
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
