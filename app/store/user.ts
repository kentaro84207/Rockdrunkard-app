import { User } from '~/types/user'
import { MutationTree, GetterTree, ActionTree } from 'vuex'
import firestore from '~/plugins/firestore'
import { firebaseAuth, GoogleAuthProvider } from '~/plugins/firebase'
import { QuerySnapshot } from '@firebase/firestore-types'
interface State {
  user: User
  ascents: []
}

export const state = (): State => ({
  user: null,
  ascents: []
})

export const mutations: MutationTree<State> = {
  setUser(state: State, payload: User): void {
    state.user = payload
  },
  setPoint(state: State, payload: number): void {
    state.user.point = payload
  },
  setAscents(state: State, payload: []): void {
    state.ascents = payload
  }
}

export const getters: GetterTree<State, State> = {
  isAuthenticated(state) {
    return !!state.user
  }
}

export const actions: ActionTree<State, State> = {
  async authStateChange({ commit }, payload) {
    const userRef = firestore.collection('users').doc(payload.uid)
    const userSnap = await userRef.get()
    const userData = userSnap.data()

    const user: User = {
      nickname: userData.nickname,
      uid: userData.uid,
      point: userData.point
    }
    commit('setUser', user)
  },

  async updateUserPoint({ commit }, payload) {
    const userRef = firestore.collection('users').doc(payload)
    const userSnap = await userRef.get()
    const userData = userSnap.data()
    const userPonint: number = userData.point
    commit('setPoint', userPonint)
  },

  async updateAscents({ commit }, payload) {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const ascentsSnapshot: QuerySnapshot = await firestore
      .collection('users')
      .doc(payload)
      .collection('ascents')
      .where('year', '==', year)
      .where('month', '==', month)
      .get()
    const ascents = []

    ascentsSnapshot.forEach(queryDocumentSnapshot =>
      ascents.push(queryDocumentSnapshot.data().num)
    )
    commit('setAscents', ascents)
  },

  async signOut({ commit }) {
    await firebaseAuth.signOut()
    commit('setUser', null)
  }
}
