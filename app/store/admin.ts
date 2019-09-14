import { Problem } from '~/types/problem'
import { MutationTree, GetterTree, ActionTree } from 'vuex'
import firestore from '~/plugins/firestore'
import {
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp
} from '@firebase/firestore-types'

interface State {
  problems: Problem[]
  dialog: boolean
  editedPid: number
  editedProblem: Problem
  setYear: number
  setMonth: number
}

export const state = (): State => ({
  problems: [],
  dialog: false,
  editedPid: -1,
  editedProblem: null,
  setYear: null,
  setMonth: null
})

export const mutations: MutationTree<State> = {
  setProblems(state: State, problems: Problem[]): void {
    state.problems = problems
  },
  setYear(state: State, year: number): void {
    state.setYear = year
  },
  setMonth(state: State, month: number): void {
    state.setMonth = month
  },
  editedProblem(state: State, problem: Problem): void {
    state.editedProblem = problem
  },
  changeDialogState(state: State): void {
    state.dialog = !state.dialog
  },
  changeEditedPid(state: State, pid: number): void {
    state.editedPid = pid
  }
}

export const actions: ActionTree<State, State> = {
  async fetchProblems({ commit }, payload) {
    const problemsSnapshot: QuerySnapshot = await firestore
      .collection('problems')
      .where('year', '==', payload.year)
      .where('month', '==', payload.month)
      .get()
    const problems = []

    problemsSnapshot.forEach(queryDocumentSnapshot =>
      problems.push(queryDocumentSnapshot.data())
    )

    commit('setProblems', problems)
  },

  async editedProblem({ commit }, payload) {
    const problemsSnapshot: QuerySnapshot = await firestore
      .collection('problems')
      .where('pid', '==', payload)
      .get()
    const problems = []

    problemsSnapshot.forEach(queryDocumentSnapshot =>
      problems.push(queryDocumentSnapshot.data())
    )

    commit('editedProblem', problems[0])
  },

  changeYear({ commit }, payload) {
    commit('setYear', payload)
  },

  changeMonth({ commit }, payload) {
    commit('setMonth', payload)
  },

  changeDialogState({ commit }, payload) {
    commit('changeDialogState')
  },

  changeEditedPid({ commit }, payload) {
    commit('changeEditedPid', payload)
  }
}
