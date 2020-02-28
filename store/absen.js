export const namespaced = true

export const state = () => ({
  absen: [],
  pendapatan: 0
})

export const mutations = {
  SET_ABSEN(state, absen) {
    state.absen = absen.absen
    state.pendapatan = absen.pendapatan
  },
  RESET(state) {
    state.absen = []
    state.pendapatan = 0
  }
}

export const actions = {
  async fetchAbsen({ commit, rootState }, { id, date }) {
    if (id === undefined) id = rootState.user.user.id
    const res = await this.$api.absen.show(id, date)
    commit('SET_ABSEN', res.data)
  }
}
