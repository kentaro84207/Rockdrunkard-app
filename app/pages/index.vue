<template>
  <v-container fluid grid-list-lg mb-12 pb-12>
    <v-layout row wrap>
      <v-flex xs12 sm8 md6>
        <v-img
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
          class="grey lighten-2"
          width="100%"
        ></v-img>
      </v-flex>
      <v-flex xs12 sm8 md6>
        <ul class="pl-0">
          <ProblemCard v-for="problem in problems" :problem="problem" :key="problem.pid"></ProblemCard>
        </ul>
      </v-flex>
      <v-btn fixed dark fab bottom right color="pink" class="mb-12" @click="refresh">
        <v-icon>refresh</v-icon>
      </v-btn>
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
export default class Top extends Vue {
  async created() {
    const today = new Date()
    const year: number = today.getFullYear()
    const month: number = today.getMonth() + 1
    const date: object = {
      year: year,
      month: month
    }
    await this.$store.dispatch('problem/getProblems', date)
  }

  private get problems() {
    try {
      return this.$store.state.problem.problems
    } catch (error) {
      return false
    }
  }

  refresh() {
    location.reload(true)
  }
}
</script>

<style lang='scss' scoped >
</style>
