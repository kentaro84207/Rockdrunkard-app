import { Problem } from '~/types/problem';
import { MutationTree, GetterTree, ActionTree } from 'vuex';
import firestore from '~/plugins/firestore';
import { QuerySnapshot, QueryDocumentSnapshot, DocumentData, Timestamp } from '@firebase/firestore-types';
// import { async } from '@firebase/util';

interface State {
  // loading: boolean;
  problems: Problem[];
}

export const state = (): State => ({
  // loading: false,
  problems: []
});

export const mutations: MutationTree<State> = {
  // setLoading(state: State, loading: boolean): void {
  //   state.loading = loading;
  // },
  setProblems(state: State, problems: Problem[]): void {
    state.problems = problems;
  }
};

export const actions: ActionTree<State, State> = {
  // Fetch events from Firestore once
  async getProblems({ commit }) {
    // commit('setLoading', true);
    const problemsSnapshot: QuerySnapshot = await firestore
      .collection('problems')
      .get();
    const problems = [];
    
    problemsSnapshot.forEach(queryDocumentSnapshot =>
      problems.push(queryDocumentSnapshot.data())
    );

    commit('setProblems', problems);
    // commit('setLoading', false);
  },
};
