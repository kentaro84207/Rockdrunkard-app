import { Ranking } from '~/types/ranking'
import { MutationTree, GetterTree, ActionTree } from 'vuex'
import firestore from '~/plugins/firestore'
import {
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp
} from '@firebase/firestore-types'
import { async } from '@firebase/util'

interface State {
  userPoints: object[]
}

export const state = (): State => ({
  userPoints: []
})

export const mutations: MutationTree<State> = {
  setUserPoints(state: State, userPoints): void {
    state.userPoints = userPoints
  },
}

export const actions: ActionTree<State, State> = {
  async fetchUserPoints({ commit }, payload) {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const yearMonth = `${year}_${month}`
    const userPoints: object[] = []
    const userPointsRef = firestore
      .collection('user_points')
      .orderBy(yearMonth, 'desc')
    const problemsSnapshot = await userPointsRef.get()

    problemsSnapshot.forEach(queryDocumentSnapshot => {
      const uid = queryDocumentSnapshot.id
      const point = queryDocumentSnapshot.data()[yearMonth]
      userPoints.push({ name: uid, point })
    })

    for await (let obj of userPoints) {
      const uid = obj['name']
      const userNameRef = firestore.collection('users').doc(uid)
      const userSnapshot = await userNameRef.get()
      obj['name'] = userSnapshot.data().nickname
    }

    commit('setUserPoints', userPoints)
  }
}
