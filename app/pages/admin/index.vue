<template>
  <v-container>
    <v-layout>
      <v-flex xs12 md3 mr-3>
        <v-select
          item-text="label"
          item-value="value"
          :items="years"
          v-model="year"
          label="年"
          @change="fetchAdminProblems()"
        ></v-select>
      </v-flex>
      <v-flex xs12 md3>
        <v-select
          item-text="label"
          item-value="value"
          :items="months"
          v-model="month"
          label="月"
          @change="fetchAdminProblems()"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-layout pl-0>
      <v-flex xs12 >
        <Table :problems="problems" ></Table>
      </v-flex>
    </v-layout>
    <v-layout mt-3 justify-center>
      <v-dialog v-model="dialog" max-width="800px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" v-on="on">＋ 課題追加</v-btn>
        </template>
        <ProblemRegister @clicked="closeDialog"></ProblemRegister>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Problem } from '~/types/problem'
import firestore from '~/plugins/firestore'
import Table from '~/components/Table.vue'
import ProblemRegister from '~/components/ProblemRegister.vue'

@Component({
  layout: 'admin',
  components: {
    Table,
    ProblemRegister,
  },
})
export default class Admin extends Vue {
  // dialog
  dialog = false

  // TODO: 日付関連共通化
  today = new Date()
  year: number = this.today.getFullYear()
  month: number = this.today.getMonth()
  months: number[] = [...Array(12).keys()].map(i => ++i)

  private get years() {
    const RELEASE_YEAR : number = 2019
    const now   = this.today
    const year = now.getFullYear()
    return this.range(RELEASE_YEAR, year)
  }

  private get problems() {
    try {
      return this.$store.state.admin.problems
    } catch (error) {
      return false
    }
  }

  closeDialog() {
    this.dialog = false
  }

  created(){
    this.fetchAdminProblems()
  }

  fetchAdminProblems() {
    const selectedDate = {
      year: this.year,
      month: this.month
    }
    this.$store.dispatch('admin/fetchProblems', selectedDate)
  }

  range(from, to) {
    const _array = [];
    for (let i = from; i <= to; i++) {
      _array.push(i)
    }
    return _array;
  }


}
</script>
