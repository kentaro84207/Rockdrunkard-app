<template>
  <v-container fluid grid-list-lg mb-12 pb-10>
    <v-layout row wrap pb-6>
      <v-flex xs12 sm8 md6>
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/rockdrunkard-app.appspot.com/o/test.jpg?alt=media&token=0efc3c53-0e53-48e2-a6db-357b80f11774"
          class="grey lighten-2 is-fixed"
          width="100%"
        ></v-img>
      </v-flex>
      <v-flex xs12 sm8 md6>
        <ul class="pl-0 mt-large">
          <ProblemCard v-for="problem in problems" :problem="problem" :key="problem.pid"></ProblemCard>
        </ul>
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
}
</script>

<style lang='scss' scoped >
.is-fixed {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}

.mt-large {
  margin-top: 70vw;
}
</style>
