export const state = () => ({
  profils: [],
})

export const mutations = {
  SET_PROFILS(state, profils) {
    state.profils = profils
  },
  ADD_PROFIL(state, profil) {
    state.profils.push(profil)
  },
  EDT_PROFIL(state, profil) {
    state.profils = state.profils.map((s) =>
      parseInt(s.value) !== parseInt(profil.value) ? s : profil
    )
  },
  DEL_PROFIL(state, id) {
    state.profils = state.profils.filter(
      (p) => parseInt(p.value) !== parseInt(id)
    )
  },
}

export const actions = {
  async fetchProfils({ commit }, query) {
    const res = await this.$api.pendapatanprofil.index(query)
    commit('SET_PROFILS', res.data)
  },
  async fetchShift({ commit }, id) {},
  async createProfil({ commit }, profil) {
    const res = await this.$api.pendapatanprofil.create(profil)
    commit('ADD_PROFIL', { ...profil, value: res.data.id_profilp })
  },
  async updateProfil({ commit }, profil) {
    const res = await this.$api.pendapatanprofil.update(profil.value, profil)
    commit('EDT_PROFIL', {
      text: res.data.nama_pendapatan,
      value: res.data.id_profilp,
    })
  },
  async deleteProfil({ commit }, id) {
    await this.$api.pendapatanprofil.delete(id)
    commit('DEL_PROFIL', id)
  },
}
