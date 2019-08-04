import { Problem } from '~/types/problem';
import { MutationTree, GetterTree, ActionTree } from 'vuex';
import firestore from '~/plugins/firestore';
import { QuerySnapshot, QueryDocumentSnapshot, DocumentData, Timestamp } from '@firebase/firestore-types';

interface State {
  problems: Problem[];
}

export const state = (): State => ({
  problems: []
});

export const mutations: MutationTree<State> = {
  setProblems(state: State, problems: Problem[]): void {
    state.problems = problems;
  }
};

export const actions: ActionTree<State, State> = {
  async getProblems({ commit }, payload) {
    const problemsSnapshot: QuerySnapshot = await firestore
      .collection('problems').where("year", "==", payload.year).where("month", "==", payload.month)
      .get();
    const problems = [];

    problemsSnapshot.forEach(queryDocumentSnapshot =>
      problems.push(queryDocumentSnapshot.data())
    );

    commit('setProblems', problems);
  },
};
