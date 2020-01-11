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
  }
}

export const actions = {
  async fetchAbsen({ commit }, { id, date }) {
    const res = await this.$api.absen.show(id, date)
    commit('SET_ABSEN', res.data)
  }
}
