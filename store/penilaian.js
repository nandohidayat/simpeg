import PenilaianService from '@/services/PenilaianService.js'

export const namespaced = true

export const state = {
  penilaians: [],
  update: {}
}

export const mutations = {
  ADD_PENILAIANS(state, penilaians) {
    state.penilaians = penilaians
  },
  ADD_UPDATE(state, update) {
    state.update = update
  },
  UPDATE_PENILAIANS(state, id) {
    state.penilaians = state.penilaians.filter((p) => p.id !== id)
  }
}

export const actions = {
  async fetchPenilaians({ commit }) {
    const res = await PenilaianService.getPenilaians()
    commit('ADD_PENILAIANS', res.data.data)
  },
  async createPenilaian({ commit }, penilaian) {
    await PenilaianService.postPenilaian(penilaian)
  },
  async fetchUpdate({ commit }, id) {
    const res = await PenilaianService.getPenilaianUpdate(id)
    commit('ADD_UPDATE', res.data.data)
  },
  async updatePenilaian({ commit }, { id, penilaian }) {
    await PenilaianService.putPenilaian(id, penilaian)
  },
  async deletePenilaian({ commit }, id) {
    await PenilaianService.deletePenilaian(id)
    commit('UPDATE_PENILAIANS', id)
  }
}
