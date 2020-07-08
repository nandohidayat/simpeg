export const namespaced = true

export const state = () => ({
  aksess: [],
  akses: [],
})

export const mutations = {
  SET_AKSESS(state, aksess) {
    state.aksess = aksess
  },
  SET_AKSES(state, akses) {
    state.akses = akses.map((i) => parseInt(i))
  },
  ADD_AKSES(state, akses) {
    state.aksess.push(akses)
  },
}

export const actions = {
  async fetchAksess({ commit }) {
    const res = await this.$api.akses.index()
    commit('SET_AKSESS', res.data)
  },
  async fetchAkses({ commit }, id) {
    const res = await this.$api.akses.show(id)
    commit('SET_AKSES', res.data.akses)
  },
  async updateAkses(ctx, { pegawai, akses }) {
    await this.$api.akses.update(pegawai, { akses })
  },
}
