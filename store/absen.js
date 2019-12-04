import AbsenService from '@/services/AbsenService'

export const namespaced = true

export const state = () => ({
  absens: [],
  absen: [],
  loaded: false
})

export const mutations = {
  SET_ABSENS(state, absens) {
    state.absens = absens
    state.loaded = true
  },
  SET_ABSEN(state, absen) {
    state.absen = absen
  },
  ADD_ABSEN(state, absen) {
    state.absens.push(absen)
  },
  EDT_ABSEN(state, absen) {
    const idx = state.absens.findIndex((b) => b.id_absen === absen.id_absen)
    state.absens[idx].absen = absen.absen
  },
  DEL_ABSEN(state, id) {
    state.absens = state.absens.filter((b) => b.id_absen !== id)
  }
}

export const actions = {
  async fetchAbsens({ commit }) {
    const res = await AbsenService.getAbsens()
    commit('SET_ABSENS', res.data.data)
  },
  async fetchAbsen({ commit }, { id, year, month }) {
    const res = await AbsenService.getAbsen(id, year, month)
    commit('SET_ABSEN', res.data.data)
  },
  async createAbsen({ commit }, absen) {
    await AbsenService.postAbsen(absen)
  },
  async updateAbsen({ commit }, absen) {
    await AbsenService.putAbsen(absen)
    commit('EDT_ABSEN', absen)
  },
  async deleteAbsen({ commit }, id) {
    await AbsenService.deleteAbsen(id)
    commit('DEL_ABSEN', id)
  }
}
