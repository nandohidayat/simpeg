export const state = () => ({
  profils: [],
  tipe: [
    { label: 'Personalia', value: 'personalia' },
    { label: 'Keuangan', value: 'keuangan' },
  ],
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
      parseInt(s.id_pendapatan_profil) !== parseInt(profil.id_pendapatan_profil)
        ? s
        : profil
    )
  },
  DEL_PROFIL(state, id) {
    state.profils = state.profils.filter(
      (p) => parseInt(p.id_pendapatan_profil) !== parseInt(id)
    )
  },
}

export const actions = {
  async fetchProfils({ commit }, query) {
    const res = await this.$api.pendapatanprofil.index(query)
    commit('SET_PROFILS', res.data)
  },
  async createProfil({ commit }, profil) {
    const res = await this.$api.pendapatanprofil.create(profil)
    commit('ADD_PROFIL', res.data)
  },
  async updateProfil({ commit }, profil) {
    const res = await this.$api.pendapatanprofil.update(
      profil.id_pendapatan_profil,
      profil
    )

    commit('EDT_PROFIL', res.data)
  },
  async deleteProfil({ commit }, id) {
    await this.$api.pendapatanprofil.delete(id)
    commit('DEL_PROFIL', id)
  },
}
