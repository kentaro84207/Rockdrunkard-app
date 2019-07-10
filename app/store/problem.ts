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
    // const sentsSnapshot = await firestore
    //   .collection('problems')
    //   .doc('201907_01')
    //   .collection('sent_users')
    //   .get();



    // console.log(problemsSnapshot)
    problemsSnapshot.forEach(queryDocumentSnapshot =>
      problems.push(queryDocumentSnapshot.data())
    );
    // sentsSnapshot.docs.forEach(async (queryDocumentSnapshot) => {
    //   const path = queryDocumentSnapshot.data().description.path
    //   const documentSnapshot = await firestore.doc(path).get()
    //   console.log(documentSnapshot.data())
    // });
    // sentsSnapshot.forEach(queryDocumentSnapshot =>
    //   console.log(queryDocumentSnapshot.data()),
    // );
    // const problems = problemsSnapshot.docs.map((queryDocumentSnapshot: QueryDocumentSnapshot) => {
    //   const data = queryDocumentSnapshot.data()
    //   return { dificulty: data.deficulty, name: data.nickname };
    // });

    console.log(problems)

    commit('setProblems', problems);
    // commit('setLoading', false);
  },
  // async addEvent({ dispatch }, event) {
  //   await firestore.collection('events').add(event);
  //   dispatch('getEvents');
  // },
  // async updateEvent({ dispatch }, event) {
  //   await firestore
  //     .collection('events')
  //     .doc(event.id)
  //     .set(event);
  //   dispatch('getEvents');
  // },
  // async deleteEvent({ dispatch }, event) {
  //   await firestore
  //     .collection('events')
  //     .doc(event.id)
  //     .delete();
  //   dispatch('getEvents');
  // }
};
