<template>
  <v-data-table
    :headers="headers"
    :items="problems"
    :pagination.sync="pageSetting"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td class="text-xs-left">{{ props.item.num }}</td>
      <td class="text-xs-left">{{ props.item.setted_by }}</td>
      <td class="text-xs-left">{{ difficulty[props.item.difficulty] }}</td>
      <td class="justify-center layout px-0">
        <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
        <v-icon small @click="deleteItem(props.item)">delete</v-icon>
      </td>
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
    { text: '編集・削除', value: 'name', sortable: false, align: 'center' }
  ]

  pageSetting: object = { rowsPerPage: -1 }

  private get difficulty() {
    return this.$store.state.problem.difficulty
  }

  editItem(item) {
    const _pid = item.pid
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
      // TODO: selectDate修正。
      const selectedDate = {
        year: 2019,
        month: 9
      }
      this.$store.dispatch('admin/fetchProblems', selectedDate)
    }
  }
}
</script>

<style lang='scss' scoped >
</style>
