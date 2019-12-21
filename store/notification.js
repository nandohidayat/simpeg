export const namespaced = true

export const state = () => ({
  errors: [],
  error_snackbar: false
})

export const mutations = {
  ADD_ERROR(state, error) {
    state.errors.push(error)
    state.error_snackbar = true
  },
  DEL_ERROR(state) {
    state.errors.shift()
    state.error_snackbar = state.errors.lenght !== 0
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
