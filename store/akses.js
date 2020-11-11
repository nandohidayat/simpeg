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
  EDT_AKSES(state, akses) {
    state.aksess = state.aksess.map((g) =>
      g.id_pegawai !== akses.id_pegawai ? g : akses
    )
  },
  DEL_AKSES(state, id) {
    state.aksess = state.aksess.filter((b) => b.id_pegawai !== id)
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
  async createAkses({ commit }, akses) {
    const res = await this.$api.akses.create(akses)
    commit('ADD_AKSES', res.data)
  },
  async updateAkses({ commit }, akses) {
    const res = await this.$api.akses.update(akses.id_pegawai, akses)
    commit('EDT_AKSES', res.data)
  },
  async deleteAkses({ commit }, id) {
    await this.$api.akses.delete(id)
    commit('DEL_AKSES', id)
  },
}
