<template>
  <li class="pb-5">
    <v-layout>
      <v-flex xs12>
        <v-card
          :color="difficultyColor[difficulty.num]"
          :class="whiteTextArray.includes(Number(difficulty.num)) ? 'white--text' : 'normal'"
          flat
          :to="`/problems/${difficulty.num}`"
          :ripple="false"
        >
          <v-layout>
            <v-flex xs7 d-flex align-center pr-0 class="h-5">
              <v-card-title primary-title class="pl-3 py-0 pr-0">
                <div class="subtitle-1 bold">{{problemRange}}</div>
              </v-card-title>
            </v-flex>
            <v-flex xs3 d-flex align-center pr-0 class="h-5">
              <v-card-title primary-title class="pl-3 py-0 pr-0">
                <div class="subtitle-1 bold">{{ascentsNum}} / {{problemNum}}</div>
              </v-card-title>
            </v-flex>
            <v-flex xs2 d-flex align-center pr-0 class="h-5">
              <v-icon :dark="whiteTextArray.includes(Number(difficulty.num))">keyboard_arrow_right</v-icon>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import firebase from 'firebase'
import firestore from '~/plugins/firestore'
import { resolve } from 'dns'

@Component({})
export default class ProblemCard extends Vue {
  @Prop() difficulty!: object
  whiteTextArray: number[] = [3, 4, 7]

  private get difficultyColor() {
    return this.$store.state.problem.difficultyColor
  }

  private get problems() {
    try {
      return this.$store.state.problem.problems
    } catch (error) {
      return false
    }
  }

  private get ascents() {
    try {
      return this.$store.state.user.ascents
    } catch (error) {
      return false
    }
  }

  private get problemRange() {
    const array = this.problems.filter(
      v => v.difficulty === Number(this.difficulty['num'])
    )
    const nums = array.map(v => v.num)
    const first = nums[0]
    const last = nums.slice(-1)[0]

    return first && last ? `No.${first} ~ ${last}` : ''
  }

  private get problemNum() {
    const array = this.problems.filter(
      v => v.difficulty === Number(this.difficulty['num'])
    )
    const nums = array.map(v => v.num)

    return nums.length
  }

  private get ascentsNum() {
    const array = this.problems.filter(
      v => v.difficulty === Number(this.difficulty['num'])
    )
    const nums = array.map(v => v.num)
    const ascentsArray = this.ascents.filter(x => nums.includes(x))

    return ascentsArray.length
  }
}
</script>
<style lang='scss' scoped >
.h-5 {
  height: 5.5vh;
}

.f-30 {
  * {
    font-size: 30px;
  }
}

.mb-off {
  *,
  .v-input__slot {
    margin-bottom: 0;
  }
}

.bold {
  font-weight: bold;
}
</style>
