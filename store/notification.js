export const namespaced = true

export const state = () => ({
  errors: []
})

export const mutations = {
  ADD_ERROR(state, error) {
    state.errors.push(error)
  },
  DEL_ERROR(state) {
    state.errors.shift()
  }
}

export const actions = {
  addError({ commit }, error) {
    commit('ADD_ERROR', error)
  },
  delError({ commit }) {
    commit('DEL_ERROR')
  }
}
