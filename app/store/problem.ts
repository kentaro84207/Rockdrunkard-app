import { Problem } from '~/types/problem'
import { MutationTree, GetterTree, ActionTree } from 'vuex'
import firestore from '~/plugins/firestore'
import {
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp
} from '@firebase/firestore-types'
// import { async } from '@firebase/util';

interface State {
  // loading: boolean;
  problems: Problem[]
  difficulty: { [key: number]: string }
  difficultyColor: { [key: number]: string }
}

export const state = (): State => ({
  // loading: false,
  problems: [],
  difficulty: {
    0: '〜7級',
    1: '6級',
    2: '5級',
    3: '4級',
    4: '3級',
    5: '2級',
    6: '1級',
    7: '初段〜'
  },
  difficultyColor: {
    0: 'r0',
    1: 'r1',
    2: 'r2',
    3: 'r3',
    4: 'r4',
    5: 'r5',
    6: 'r6',
    7: 'r7'
  }
})

export const mutations: MutationTree<State> = {
  // setLoading(state: State, loading: boolean): void {
  //   state.loading = loading;
  // },
  setProblems(state: State, problems: Problem[]): void {
    state.problems = problems
  }
}

export const actions: ActionTree<State, State> = {
  // Fetch events from Firestore once
  async getProblems({ commit }, payload) {
    // commit('setLoading', true);
    const problemsSnapshot: QuerySnapshot = await firestore
      .collection('problems')
      .where('year', '==', payload.year)
      .where('month', '==', payload.month)
      .get()
    const problems = []

    problemsSnapshot.forEach(queryDocumentSnapshot =>
      problems.push(queryDocumentSnapshot.data())
    )

    const sortedProblems = problems.sort((a, b) => {
      return a.num < b.num ? -1 : a.num > b.num ? 1 : 0
    })

    commit('setProblems', sortedProblems)
    // commit('setLoading', false);
  }
}
