<template>
  <v-data-table :headers="headers" :items="problems" :pagination.sync="pageSetting" class="elevation-1">
    <template v-slot:items="props">
      <td class="text-xs-left">{{ props.item.num }}</td>
      <td class="text-xs-left">{{ props.item.setted_by }}</td>
      <td class="text-xs-left">{{ difficulty[props.item.difficulty] }}</td>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Problem } from '~/types/problem'

@Component({})
export default class Table extends Vue {
  @Prop() problems!: Problem[]

  headers: object[] = [
    { text: '番号', value: 'num', align: 'left' },
    { text: 'セッター', value: 'setted_by', align: 'left' },
    { text: '難易度', value: 'difficulty', align: 'left' }
  ]

  pageSetting: object = { rowsPerPage: -1 }

  private get difficulty() {
    return this.$store.state.problem.difficulty
  }
}
</script>

<style lang='scss' scoped >
</style>
