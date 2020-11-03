export const state = () => ({
  aksess: [],
})

export const mutations = {
  SET_AKSESS(state, aksess) {
    state.aksess = aksess
  },
  ADD_AKSES(state, akses) {
    state.aksess.push(akses)
  },
  EDT_AKSES(state, akses) {
    state.aksess = state.aksess.map((s) =>
      parseInt(s.id_akses_group) !== parseInt(akses.id_akses_group) ? s : akses
    )
  },
  DEL_AKSES(state, id) {
    state.aksess = state.aksess.filter(
      (b) => parseInt(b.id_akses_group) !== parseInt(id)
    )
  },
}

export const actions = {
  async fetchAksess({ commit }) {
    const res = await this.$api.aksesgroup.index()
    commit('SET_AKSESS', res.data)
  },
  async createAkses({ commit }, akses) {
    const res = await this.$api.aksesgroup.create(akses)
    commit('ADD_AKSES', res.data)
  },
  async updateAkses({ commit }, akses) {
    await this.$api.aksesgroup.update(akses.id_akses_group, akses)
    commit('EDT_AKSES', akses)
  },
  async deleteAkses({ commit }, id) {
    await this.$api.aksesgroup.delete(id)
    commit('DEL_AKSES', id)
  },
}
