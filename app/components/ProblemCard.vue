<template>
  <li class="pb-6">
    <v-layout>
      <v-flex xs12>
        <v-card
          :color="difficultyColor[problem.difficulty]"
          raised
          :class="problem.difficulty === 7 ? 'white--text' : 'black--text'"
        >
          <v-layout>
            <v-flex xs3 d-flex align-center>
              <v-card-title primary-title class="pl-3 py-0 pr-0">
                <div>
                  <div class="title">No.{{ problem.num }}</div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs5>
              <v-card-title primary-title class="pl-3 py-0">
                <div>
                  <div class="title">{{ problem.setted_by }}</div>
                  <div class="body-1">完登数：{{ this.ascentLength }}</div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs4 px-0>
              <div class="py-0">
                <v-switch
                  pt-0
                  color="success"
                  :dark="problem.difficulty === 7"
                  hide-details
                  class="mt-3"
                  inset
                  v-model="ascentStatus"
                  :label="labelText"
                  @change="switchSentProblem(problem)"
                ></v-switch>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Problem } from '~/types/problem'
import firebase from 'firebase'
import firestore from '~/plugins/firestore'
import { resolve } from 'dns'

@Component({})
export default class ProblemCard extends Vue {
  @Prop() problem!: Problem

  ascentStatus: boolean = false

  created() {
    this.switchStatus()
  }

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
    return this.ascentStatus ? '完登！' : '未完登'
  }

  // the number of ascents
  private get ascentLength() {
    const problems = this.$store.state.problem.problems
    for (const problem of problems) {
      if (problem.num === this.problem.num) {
        return problem.ascent_users ? problem.ascent_users.length : 0
      }
    }
  }

  switchStatus() {
    const ascentUsers = this.problem.ascent_users
    try {
      this.ascentStatus = ascentUsers.includes(this.user.uid)
    } catch (error) {
      this.ascentStatus = false
    }
  }

  switchSentProblem(problem) {
    if (
      confirm(
        `課題${problem.num}を${this.labelText} に変更してもよろしいですか？`
      )
    ) {
      this.updateDb(problem)
    } else {
      setTimeout(() => {
        this.ascentStatus = !this.ascentStatus
      }, 10)
    }
  }

  async updateDb(problem) {
    const problemId = `${problem.year}_${problem.month}_${problem.num}`
    const ascentRef = firestore
      .collection('users')
      .doc(this.user.uid)
      .collection('ascents')
      .doc(problemId)
    const userRef = firestore
      .collection('problems')
      .doc(problemId)
      .collection('ascent_users')
      .doc(this.user.uid)
    const problemRef = firestore.collection('problems').doc(problemId)
    // for vuex status
    const useInfo = { num: problem.num, user: this.user.uid }

    if (this.ascentStatus) {
      // sent
      const batch = firestore.batch()
      batch.update(problemRef, {
        ascent_users: firebase.firestore.FieldValue.arrayUnion(this.user.uid)
      })
      batch.set(ascentRef, {
        pid: problem.pid,
        year: problem.year,
        month: problem.month,
        problemRef: problemRef,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      batch.set(userRef, {
        uid: this.user.uid,
        userRef: firestore.collection('users').doc(this.user.uid),
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      })
      await batch.commit()
      this.$store.dispatch('problem/addAscentUser', useInfo)
    } else {
      // not sent
      const batch = firestore.batch()
      batch.update(problemRef, {
        ascent_users: firebase.firestore.FieldValue.arrayRemove(this.user.uid)
      })
      batch.delete(ascentRef)
      batch.delete(userRef)
      await batch.commit()
      this.$store.dispatch('problem/removeAscentUser', useInfo)
    }
  }
}
</script>
<style lang='scss' scoped >
</style>
