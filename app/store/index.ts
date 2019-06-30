export const strict = false

export const state = () => ({
  user: null
})

export const getters = {
  uid(state) {
    if (state.user && state.user.uid) return state.user.uid
    else return null
  },

  user(state) {
    return state.user
  },

  isAuthenticated(state) {
    return !!state.user && !!state.user.uid
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  setUser({ commit }, payload) {
    commit('setUser', payload)
  }
}
