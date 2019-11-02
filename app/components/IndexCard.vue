<template>
  <li class="pb-5">
    <v-layout>
      <v-flex xs12>
        <v-card
          :color="difficultyColor[difficulty.num]"
          :class="difficulty.num === '7' ? 'white--text' : 'normal'"
          flat
          :to="`/problems/${difficulty.num}`"
          :ripple="false"
        >
          <v-layout>
            <v-flex xs10 d-flex align-center pr-0 class="h-5">
              <v-card-title primary-title class="pl-3 py-0 pr-0">
                  <div class="subtitle-1 bold">{{problemNum}}</div>
              </v-card-title>
            </v-flex>
            <v-flex xs2 d-flex align-center pr-0 class="h-5">
              <v-icon :dark="difficulty.num === '7'">keyboard_arrow_right</v-icon>
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

  private get problemNum() {
    const array = this.problems.filter(v => v.difficulty === Number(this.difficulty['num']))
    const nums = array.map(v => v.num)
    const first = nums[0]
    const last = nums.slice(-1)[0]

    return `No.${first} ~ ${last}`
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
