export const state = () => ({
  pegawais: []
})

export const mutations = {
  SET_PEGAWAIS(state, pegawais) {
    state.pegawais = pegawais
  }
}

export const actions = {
  async fetchPegawais({ commit }, { dept }) {
    const res = await this.$api.pegawai.index({ dept })
    commit('SET_PEGAWAIS', res.data)
  }
}
