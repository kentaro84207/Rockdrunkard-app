<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap pb-8>
      <v-flex xs12>
        <v-carousel height="250" hide-delimiter-background light>
          <v-carousel-item v-for="(image,i) in images" :key="i" :src="image.src"></v-carousel-item>
        </v-carousel>
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
  images: object[] = [
    {
      src: '/images/app1.png'
    },
    {
      src: '/images/app2.png'
    },
    {
      src: '/images/app3.png'
    }
  ]

  async created() {
    const today = new Date()
    const year: number = today.getFullYear()
    const month: number = today.getMonth() + 1
    const date: object = {
      year: year,
      month: month
    }
    await this.$store.dispatch('problem/getProblems', date)
    await this.$store.dispatch('user/updateAscents', this.user.uid)
  }

  private get user() {
    try {
      return this.$store.state.user.user
    } catch (error) {
      return false
    }
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
