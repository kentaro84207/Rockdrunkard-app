<template>
  <li class="pb-3">
    <v-card :color="difficultyColor[problem.difficulty]" raised class="black--text">
      <v-layout>
        <v-flex xs3>
          <v-card-title primary-title class="pl-3 py-0 pr-0">
            <div>
              <div class="title">No.{{ problem.num }}</div>
              <div class="body-1">{{ problem.setted_by }}</div>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs5>
          <v-card-title primary-title class="pl-3 py-0">
            <div>
              <div class="title">{{ difficulty[problem.difficulty] }}</div>
              <div class="body-1">完登数：10</div>
            </div>
          </v-card-title>
        </v-flex>
        <v-flex xs4 pl-0>
          <div class="py-0">
            <v-switch
              pt-0
              color="primary"
              hide-details
              class="mt-3"
              inset
              v-model="switchStatus"
              :label="labelText"
              @change="switchSentProblem(problem)"
            ></v-switch>
            <!-- <v-checkbox @click="addSentProblem(problem)" label="完登"></v-checkbox> -->
          </div>
        </v-flex>
      </v-layout>
      <v-divider class="mb-1" light></v-divider>
    </v-card>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Problem } from '~/types/problem'
import firebase from 'firebase'
import firestore from '~/plugins/firestore'

@Component({})
export default class ProblemCard extends Vue {
  @Prop() problem!: Problem[]

  switchStatus: boolean = false

  private get user() {
    try {
      return this.$store.state.user.user
    } catch (error) {
      return false
    }
  }

  private get difficulty() {
    return this.$store.state.problem.difficulty
  }

  private get difficultyColor() {
    return this.$store.state.problem.difficultyColor
  }

  private get labelText() {
    return this.switchStatus ? '完登' : '未完登'
  }

  async switchSentProblem(problem) {
    if (
      confirm(
        `課題${problem.num}を${this.labelText} に変更してもよろしいですか？`
      )
    ) {
    } else {
      setTimeout(() => {
        this.switchStatus = !this.switchStatus
      }, 10)
    }
    // 読み込み時に、完登状態を反映
    const pid = String(problem.pid)
    const problemId = `${problem.year}_${problem.month}_${problem.num}`
    // const ascentRef = firestore
    //   .collection('users')
    //   .doc(this.user.uid)
    //   .collection('ascents')
    //   .doc(pid)
    // const userRef = firestore
    //     .collection('problems')
    //     .doc(problemId)
    //     .collection('ascent_users')
    //     .doc(this.user.uid)
    const problemRef = firestore.collection('problems').doc(problemId)

    if (this.switchStatus) {
      const batch = firestore.batch()
      batch.update(problemRef, {
        ascent_users: firebase.firestore.FieldValue.arrayUnion(this.user.uid)
      })
      //   batch.set(ascentRef, {
      //     created_at: firebase.firestore.FieldValue.serverTimestamp()
      //   })
      //   batch.set(userRef, {
      //     created_at: firebase.firestore.FieldValue.serverTimestamp()
      //   })
      await batch.commit()
    } else {
      const batch = firestore.batch()
      batch.update(problemRef, {
        ascent_users: firebase.firestore.FieldValue.arrayRemove(this.user.uid)
      })
      //   batch.delete(ascentRef)
      //   batch.delete(userRef)
        await batch.commit()
    }
  }
}
</script>
<style lang='scss' scoped >
</style>
