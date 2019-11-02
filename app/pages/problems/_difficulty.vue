<template>
  <v-container fluid grid-list-lg mb-12 pb-10>
    <v-layout row wrap mt-3>
      <v-flex xs12 sm8 md6>
        <ul class="pl-0 mt-large">
          <ProblemCard v-for="problem in problems" :problem="problem" :key="problem.pid"></ProblemCard>
        </ul>
      </v-flex>
      <v-flex xs12 d-flex align-center justify-center pr-0 class="h-50">
        <nuxt-link to="/" class="black--text"><v-icon class="mbs">keyboard_arrow_left</v-icon>課題一覧に戻る</nuxt-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firestore from '~/plugins/firestore'
import ProblemCard from '~/components/ProblemCard.vue'

@Component({
  components: {
    ProblemCard
  }
})
export default class Problems extends Vue {
  private get problems() {
    try {
      return this.$store.state.problem.problems
    } catch (error) {
      return false
    }
  }
}
</script>

<style lang='scss' scoped >
.mbs {
  margin-bottom: 2px;
}
</style>
