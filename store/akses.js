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
    akses.kepala = akses.kepala.map((i) => parseInt(i))
    akses.semua = akses.semua.map((i) => parseInt(i))
    state.akses = akses
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
    commit('SET_AKSES', res.data)
  },
  async createAkses({ commit }, akses) {
    await this.$api.akses.create(akses)
  },
}
