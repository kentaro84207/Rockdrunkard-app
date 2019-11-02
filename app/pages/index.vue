<template>
  <v-container fluid grid-list-lg>
    <template v-if="isLoaded">
      <v-layout row wrap pb-8>
        <v-flex xs12>
          <v-img
            :src="url"
            :on="loaded"
            class="grey lighten-2"
            width="100%"
          ></v-img>
        </v-flex>
        <v-flex xs12>
          <ul class="pl-0 smb-5">
            <IndexCard
              v-for="difficulty in difficultis"
              :difficulty="difficulty"
              :key="difficulty.num"
            ></IndexCard>
          </ul>
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-layout justify-center align-center class="pt-h px-5">
        <v-progress-linear indeterminate rounded color="primary"></v-progress-linear>
      </v-layout>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firestore from '~/plugins/firestore'
import IndexCard from '~/components/IndexCard.vue'

@Component({
  components: {
    IndexCard
  }
})
export default class Top extends Vue {
  isLoaded: boolean = false
  url =
    'https://firebasestorage.googleapis.com/v0/b/rockdrunkard-app.appspot.com/o/test.jpg?alt=media&token=0efc3c53-0e53-48e2-a6db-357b80f11774'

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

  mounted(): void {
    setTimeout(() => {
      this.isLoaded = true
    }, 1500);
  }

  private get difficultis() {
    const difficultyObj = this.$store.state.problem.difficulty
    return Object.entries(difficultyObj).map(([key, value]) => ({
      num: key
    }))
  }
}
</script>

<style lang='scss' scoped >
@media screen and (max-width: 374px) {
  .smb-5 {
    margin-bottom: 5vh;
  }
}

.pt-h {
  padding-top: 45vh;
}
</style>
