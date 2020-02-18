export const namespaced = true

export const state = () => ({
  pendapatans: []
})

export const mutations = {
  SET_PENDAPATANS(state, pendapatans) {
    state.pendapatans = pendapatans
  },
  ADD_PENDAPATAN(state, pendapatan) {
    state.pendapatans.push(pendapatan)
  },
  EDT_PENDAPATAN(state, pendapatan) {
    const idx = state.pendapatans.findIndex(
      (b) => b.id_pendapatan_harian === pendapatan.id_pendapatan_harian
    )
    state.pendapatans[idx].tgl = pendapatan.tgl
    state.pendapatans[idx].pendapatan = pendapatan.pendapatan
  },
  DEL_PENDAPATAN(state, id) {
    state.pendapatans = state.pendapatans.filter(
      (b) => b.id_pendapatan_harian !== id
    )
  }
}

export const actions = {
  async fetchPendapatans({ commit }) {
    const res = await this.$api.pendapatanharian.index()
    commit('SET_PENDAPATANS', res.data)
  },
  async createPendapatan({ commit }, pendapatan) {
    const res = await this.$api.pendapatanharian.create(pendapatan)
    commit('ADD_PENDAPATAN', res.data)
  },
  async updatePendapatan({ commit }, pendapatan) {
    await this.$api.pendapatanharian.update(
      pendapatan.id_pendapatan_harian,
      pendapatan
    )
    commit('EDT_PENDAPATAN', pendapatan)
  },
  async deletePendapatan({ commit }, id) {
    await this.$api.pendapatanharian.delete(id)
    commit('DEL_PENDAPATAN', id)
  }
}
