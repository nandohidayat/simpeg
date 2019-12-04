import PegawaiService from '@/services/PegawaiService.js'

export const namespaced = true

export const state = () => ({
  pegawais: [],
  rekans: {}
})

export const mutations = {
  ADD_PEGAWAIS(state, pegawais) {
    state.pegawais = pegawais
  },
  ADD_REKANS(state, rekans) {
    state.rekans = rekans
  }
}

export const actions = {
  async fetchPegawais({ commit }) {
    const res = await PegawaiService.getPegawais()
    commit('ADD_PEGAWAIS', res.data.data)
  },
  async fetchRekans({ commit }, id) {
    const res = await PegawaiService.getRekans(id)
    commit('ADD_REKANS', res.data.data)
  }
}
