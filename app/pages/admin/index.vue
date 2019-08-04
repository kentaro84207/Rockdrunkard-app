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
          @change="setAdminProblems()"
        ></v-select>
      </v-flex>
      <v-flex xs12 md3>
        <v-select
          item-text="label"
          item-value="value"
          :items="months"
          v-model="month"
          label="月"
          @change="setAdminProblems()"
        ></v-select>
      </v-flex>
    </v-layout>
    <v-container pl-0>
      <Table :problems="problems" ></Table>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Problem } from '~/types/problem'
import firestore from '~/plugins/firestore'
import Table from '~/components/Table.vue'

@Component({
  layout: 'admin',
  components: {
    Table,
  },
})
export default class Admin extends Vue {
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

  created(){
    this.setAdminProblems()
  }

  setAdminProblems() {
    const selectedDate = {
      year: this.year,
      month: this.month
    }
    this.$store.dispatch('admin/getProblems', selectedDate)
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
