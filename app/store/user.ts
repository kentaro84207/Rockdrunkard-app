import { User } from '~/types/user';
import { MutationTree, GetterTree, ActionTree } from 'vuex';
import firestore from '~/plugins/firestore';
import { firebaseAuth, GoogleAuthProvider } from '~/plugins/firebase';

interface State {
  // loading: boolean;
  user: User;
}

export const state = (): State => ({
  // loading: false,
  user: null
});

export const mutations: MutationTree<State> = {
  // setLoading(state: State, loading: boolean): void {
  //   state.loading = loading;
  // },
  setUser(state: State, payload: User): void {
    state.user = payload;
  }
};

export const getters: GetterTree<State, State> = {
  isAuthenticated(state) {
    return !!state.user
  },
  // user(state) {
  //   return state.user
  // }
};

export const actions: ActionTree<State, State> = {
  authStateChange({ commit }, payload) {
    // commit('setLoading', true);

    const user: User = {
      ...payload.providerData[0],
      emailVerified: payload.emailVerified,
      isAnonymous: payload.isAnonymous,
      uid: payload.uid
    };
    commit('setUser', user);
    // commit('setLoading', false);
  },

  addSentProblem({ commit }, payload) {
    console.log(payload)
  },

  async signInWithGoogle() {
    await firebaseAuth.signInWithPopup(GoogleAuthProvider);
  },

  async signOut({ commit }) {
    await firebaseAuth.signOut();
    commit('setUser', null);
  }
};
