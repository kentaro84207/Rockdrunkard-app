<template>
  <v-card>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <div>{{ user }}</div>
        <div @click="signOut()">Sign Out</div>
        <v-flex xs12 sm8 md6>
          <ul>
            <ProblemCard v-for="problem in problems" :problem="problem" :key="problem.pid" ></ProblemCard>
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
    ProblemCard,
  },
})
export default class Top extends Vue {
  async created() {
    await this.$store.dispatch('problem/getProblems')
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
