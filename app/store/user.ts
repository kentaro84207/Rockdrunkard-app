import { User } from '~/types/user'
import { MutationTree, GetterTree, ActionTree } from 'vuex'
import firestore from '~/plugins/firestore'
import { firebaseAuth, GoogleAuthProvider } from '~/plugins/firebase'

interface State {
  // loading: boolean;
  user: User
}

export const state = (): State => ({
  // loading: false,
  user: null
})

export const mutations: MutationTree<State> = {
  // setLoading(state: State, loading: boolean): void {
  //   state.loading = loading;
  // },
  setUser(state: State, payload: User): void {
    state.user = payload
  },
  setPoint(state: State, payload: number): void {
    state.user.point = payload
  }
}

export const getters: GetterTree<State, State> = {
  isAuthenticated(state) {
    return !!state.user
  }
  // user(state) {
  //   return state.user
  // }
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
    const userRef = firestore.collection('users').doc(payload.uid)
    const userSnap = await userRef.get()
    const userData = userSnap.data()
    const userPonint: number = userData.point
    commit('setPoint', userPonint)
  },

  async signOut({ commit }) {
    await firebaseAuth.signOut()
    commit('setUser', null)
  }
}
