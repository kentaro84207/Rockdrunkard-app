<template>
  <v-card>
    <v-container fluid grid-list-lg mb-10 pb-12>
      <v-layout row wrap>
        <div>{{ user }}</div>
        <div @click="signOut()">Sign Out</div>
        <v-flex xs12 sm8 md6>
          <ul class="pl-0">
            <ProblemCard v-for="problem in problems" :problem="problem" :key="problem.pid"></ProblemCard>
          </ul>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
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

  private get user() {
    try {
      return this.$store.state.user.user.displayName
    } catch (error) {
      return false
    }
  }

  private get problems() {
    try {
      return this.$store.state.problem.problems
    } catch (error) {
      return false
    }
  }

  // private get sortedProblemsByNum() {
  //   return this.problems.sort((a, b) => {
  //     return a.num < b.num ? -1 : a.num > b.num ? 1 : 0
  //   })
  // }

  // async problems() {
  //   await this.$store.dispatch('problem/getProblems')
  // }

  async signOut() {
    try {
      await this.$store.dispatch('user/signOut')
      this.$router.replace('/')
    } catch (error) {
      console.log('Sign Out error', error)
    }
  }
}
</script>

<style lang='scss' scoped >
</style>
