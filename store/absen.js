export const namespaced = true

export const state = () => ({
  absen: []
})

export const mutations = {
  SET_ABSEN(state, absen) {
    state.absen = absen
  }
}

export const actions = {
  async fetchAbsen({ commit }, { id, date }) {
    const res = await this.$api.absen.show(id, date)
    commit('SET_ABSEN', res.data)
  }
}
