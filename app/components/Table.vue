<template>
  <v-data-table
    :headers="headers"
    :items="problems"
    :sort-by="['num']"
    class="elevation-1"
  >
    <template v-slot:top>
    </template>
    <template v-slot:item.difficulty="{ item }">
      <v-layout>
          <v-flex>
            <v-sheet
              :width="15"
              :height="15"
              :elevation="1"
              :color="difficultyColor[item.difficulty]"
            ></v-sheet>
          </v-flex>
          <v-flex>{{ difficulty[item.difficulty] }}</v-flex>
        </v-layout>
    </template>
    <template v-slot:item.edit="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      <v-icon small @click="deleteItem(item)">delete</v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Problem } from '~/types/problem'
import firestore from '~/plugins/firestore'

@Component({})
export default class Table extends Vue {
  @Prop() problems!: Problem[]

  headers: object[] = [
    { text: '課題番号', value: 'num', align: 'left' },
    { text: 'セッター', value: 'setted_by', align: 'left' },
    { text: '難易度', value: 'difficulty', align: 'left' },
    { text: '編集・削除', value: 'edit', sortable: false, align: 'center' }
  ]

  private get year() {
    return this.$store.state.admin.setYear
  }

  private get month() {
    return this.$store.state.admin.setMonth
  }

  private get difficulty() {
    return this.$store.state.problem.difficulty
  }

  private get difficultyColor() {
    return this.$store.state.problem.difficultyColor
  }

  editItem(item) {
    const _pid = item.pid
    this.$store.dispatch('admin/editingProblem', item)
    this.$store.dispatch('admin/changeEditedPid', _pid)
    this.$store.dispatch('admin/changeDialogState', 'open')
  }

  deleteItem(item) {
    const _deleteNum: string = `${item.year}_${item.month}_${item.num}`
    if (confirm(`課題番号:${item.num} を消してもよろしいですか？`)) {
      firestore
        .collection('problems')
        .doc(_deleteNum)
        .delete()
      const selectedDate = {
        year: this.year,
        month: this.month
      }
      this.$store.dispatch('admin/fetchProblems', selectedDate)
    }
  }
}
</script>

<style lang='scss' scoped >
</style>
