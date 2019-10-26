<template>
  <li class="pb-6">
    <v-layout>
      <v-flex xs12>
        <v-card
          :color="difficultyColor[problem.difficulty]"
          flat
          :class="problem.difficulty === 7 && !ascentStatus ? 'white--text' : ascentStatus ? 'is-done' : ''"
        >
          <v-layout>
            <v-flex xs3 d-flex align-center pr-0 class="h-50">
              <v-card-title primary-title class="pl-3 py-0 pr-0">
                <div>
                  <div class="subtitle-1">No.{{ problem.num }}</div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs4 d-flex align-center px-0 class="h-50">
              <v-card-title primary-title class="pl-3 py-0">
                <div class="subtitle-1">{{ problem.setted_by }}</div>
              </v-card-title>
            </v-flex>
            <v-flex xs3 d-flex align-center px-0 class="h-50">
              <v-card-title primary-title class="pl-3 py-0">
                <div class="body-1">
                  <v-icon
                    :color="problem.difficulty === 7 && !ascentStatus ? 'white' : 'gray'"
                    class="mb-1 f-30"
                  >how_to_reg</v-icon>
                  ×{{ this.ascentLength }}
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs2 d-flex align-center pt-3 px-0 class="h-50">
              <div class="py-0">
                <v-checkbox
                  pt-0
                  :color="ascentStatus ? 'r7' : 'white'"
                  :dark="problem.difficulty === 7"
                  class="f-30"
                  v-model="ascentStatus"
                  @change="switchSentProblem(problem)"
                ></v-checkbox>
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
    const confirmText = this.ascentStatus
      ? `No.${problem.num}登れた`
      : `No.${problem.num}登れてなかった`
    if (confirm(confirmText)) {
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
.h-50 {
  max-height: 50px;
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

.is-done {
  &.r0 {
    background-color: rgba(25, 118, 210, 0.4) !important;
  }
  &.r1 {
    background-color: rgba(251, 192, 45, 0.4) !important;
  }
  &.r2 {
    background-color: rgba(251, 140, 0, 0.4) !important;
  }
  &.r3 {
    background-color: rgba(229, 57, 53, 0.4) !important;
  }
  &.r4 {
    background-color: rgba(46, 125, 50, 0.4) !important;
  }
  &.r5 {
    background-color: rgba(255, 255, 255, 0.4) !important;
  }
  &.r6 {
    background-color: rgba(189, 189, 189, 0.4) !important;
  }
  &.r7 {
    background-color: rgba(33, 33, 33, 0.4) !important;
  }
}
</style>
