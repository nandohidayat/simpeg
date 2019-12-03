import DepartemenService from '@/services/DepartemenService.js'

export const namespaced = true

export const state = {
  departemens: [],
  loaded: false
}

export const mutations = {
  SET_DEPARTEMENS(state, departemens) {
    state.departemens = departemens
    state.loaded = true
  },
  ADD_DEPARTEMEN(state, departemen) {
    state.departemens.push(departemen)
  },
  EDT_DEPARTEMEN(state, departemen) {
    const idx = state.departemens.findIndex(
      (b) => b.id_departemen === departemen.id_departemen
    )
    state.departemens[idx].departemen = departemen.departemen
    state.departemens[idx].tingkat = departemen.tingkat
    state.departemens[idx].id_bagian = departemen.id_bagian
  },
  DEL_DEPARTEMEN(state, id) {
    state.departemens = state.departemens.filter((d) => d.id_departemen !== id)
  }
}

export const actions = {
  async fetchDepartemens({ commit }) {
    const res = await DepartemenService.getDepartemens()
    commit('SET_DEPARTEMENS', res.data.data)
  },
  async createDepartemen({ commit }, departemen) {
    const res = await DepartemenService.postDepartemen(departemen)
    commit('ADD_DEPARTEMEN', res.data.data)
  },
  async updateDepartemen({ commit }, departemen) {
    await DepartemenService.putDepartemen(departemen)
    commit('EDT_DEPARTEMEN', departemen)
  },
  async deleteDepartemen({ commit }, id) {
    await DepartemenService.deleteDepartemen(id)
    commit('DEL_DEPARTEMEN', id)
  }
}
