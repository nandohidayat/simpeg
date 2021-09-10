export const namespaced = true

export const state = () => ({
  pendapatans: [],
})

export const mutations = {
  SET_PENDAPATANS(state, pendapatans) {
    state.pendapatans = pendapatans
  },
  ADD_PENDAPATAN(state, pendapatan) {
    state.pendapatans.push(pendapatan)
  },
  EDT_PENDAPATAN(state, pendapatan) {
    state.pendapatans = state.pendapatans.map((p) =>
      p.id_pendapatan_makan !== pendapatan.id_pendapatan_makan ? p : pendapatan
    )
  },
  DEL_PENDAPATAN(state, id) {
    state.pendapatans = state.pendapatans.filter(
      (b) => b.id_pendapatan_makan !== id
    )
  },
}

export const actions = {
  async fetchPendapatans({ commit }) {
    const res = await this.$api.pendapatanmakan.index()
    commit('SET_PENDAPATANS', res.data)
  },
  async createPendapatan({ commit }, pendapatan) {
    const res = await this.$api.pendapatanmakan.create(pendapatan)
    commit('ADD_PENDAPATAN', res.data)
  },
  async updatePendapatan({ commit }, pendapatan) {
    await this.$api.pendapatanmakan.update(
      pendapatan.id_pendapatan_makan,
      pendapatan
    )
    commit('EDT_PENDAPATAN', pendapatan)
  },
  async deletePendapatan({ commit }, id) {
    await this.$api.pendapatanmakan.delete(id)
    commit('DEL_PENDAPATAN', id)
  },
}
