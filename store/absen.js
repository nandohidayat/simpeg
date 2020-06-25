export const state = () => ({
  absens: [],
  pendapatan: 0,
})

export const mutations = {
  SET_ABSENS(state, absen) {
    state.absens = absen.absen
    state.pendapatan = absen.pendapatan
  },
}

export const actions = {
  async fetchAbsens({ commit, rootState }, { pegawai, year, month }) {
    if (pegawai === undefined) pegawai = rootState.user.user.id
    const res = await this.$api.absen.index({ pegawai, year, month })
    commit('SET_ABSENS', res.data)
  },
}
