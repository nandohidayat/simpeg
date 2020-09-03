export const state = () => ({
  profils: [],
  id: 0,
  personalia: [],
  keuangan: [],
})

export const mutations = {
  SET_PROFILS(state, profils) {
    state.profils = profils
  },
  SET_PROFIL(state, { personalia, keuangan, id }) {
    state.personalia = personalia
    state.keuangan = keuangan
    state.id = id
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
  addPersonalia(state, value) {
    state.personalia.push({ id: ++state.id, ...value })
  },
  editPersonalia(state, value) {
    let temp = state.personalia
    temp = temp.map((p) => (parseInt(p.id) !== parseInt(value.id) ? p : value))
    temp.forEach((p) => {
      p.elements = p.elements.map((e) =>
        parseInt(e.id) !== parseInt(value.id) ? e : value
      )
    })
    state.personalia = temp
  },
  delPersonalia(state, value) {
    let temp = state.personalia
    temp = temp.filter((p) => parseInt(p.id) !== parseInt(value))
    temp.forEach((p) => {
      p.elements = p.elements.filter((e) => parseInt(e.id) !== parseInt(value))
    })
    state.personalia = temp
  },
  updatePersonalia(state, value) {
    state.personalia = value
  },
  addKeuangan(state, value) {
    state.keuangan.push({ id: ++state.id, ...value })
  },
  delKeuangan(state, value) {
    let temp = state.keuangan
    temp = temp.filter((p) => parseInt(p.id) !== parseInt(value))
    temp.forEach((p) => {
      p.elements = p.elements.filter((e) => parseInt(e.id) !== parseInt(value))
    })
    state.keuangan = temp
  },
  editKeuangan(state, value) {
    let temp = state.keuangan
    temp = temp.map((p) => (parseInt(p.id) !== parseInt(value.id) ? p : value))
    temp.forEach((p) => {
      p.elements = p.elements.map((e) =>
        parseInt(e.id) !== parseInt(value.id) ? e : value
      )
    })
    state.keuangan = temp
  },
  updateKeuangan(state, value) {
    state.keuangan = value
  },
}

export const actions = {
  async fetchProfils({ commit }, query) {
    const res = await this.$api.pendapatanprofil.index(query)
    commit('SET_PROFILS', res.data)
  },
  async fetchProfil({ commit }, id) {
    const res = await this.$api.pendapatanprofil.show(id)
    commit('SET_PROFIL', res.data)
  },
  async createProfil({ commit }, profil) {
    const res = await this.$api.pendapatanprofil.create(profil)
    commit('ADD_PROFIL', { ...profil, value: res.data.id_profilp })
  },
  async updateProfil({ commit }, profil) {
    const res = await this.$api.pendapatanprofil.update(profil.value, profil)

    if (!profil.type) {
      commit('EDT_PROFIL', {
        text: res.data.nama_pendapatan,
        value: res.data.id_profilp,
      })
    }
  },
  async deleteProfil({ commit }, id) {
    await this.$api.pendapatanprofil.delete(id)
    commit('DEL_PROFIL', id)
  },
}
