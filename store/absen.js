export const state = () => ({
  absens: [],
  harian: 0,
  makan: 0,
})

export const mutations = {
  SET_ABSENS(state, absen) {
    state.absens = absen.absen
    state.harian = absen.harian
    state.makan = absen.makan
  },
}

export const actions = {
  async fetchAbsen({ commit, rootState }, { pegawai, year, month }) {
    if (pegawai === undefined) pegawai = rootState.user.user.id
    const res = await this.$api.absen.show(pegawai, { year, month })
    commit('SET_ABSENS', res.data)
  },
}
