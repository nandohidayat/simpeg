import AksesService from '@/services/AksesService.js'

export const namespaced = true

export const state = () => ({
  aksess: [],
  akses: [],
  loaded: false
})

export const mutations = {
  SET_AKSESS(state, aksess) {
    state.aksess = aksess
    state.loaded = true
  },
  SET_AKSES(state, akses) {
    state.akses = akses
  },
  ADD_AKSES(state, akses) {
    state.aksess.push(akses)
  },
  EDT_AKSES(state, akses) {
    const idx = state.aksess.findIndex((b) => b.id_akses === akses.id_akses)
    state.aksess[idx].akses = akses.akses
  },
  DEL_AKSES(state, id) {
    state.aksess = state.aksess.filter((b) => b.id_akses !== id)
  }
}

export const actions = {
  async fetchAksess({ commit }) {
    const res = await AksesService.getAksess()
    commit('SET_AKSESS', res.data.data)
  },
  async fetchAkses({ commit }, id) {
    const res = await AksesService.getAkses(id)
    commit('SET_AKSES', res.data.data)
  },
  async createAkses({ commit }, akses) {
    await AksesService.postAkses(akses)
  },
  async updateAkses({ commit }, akses) {
    await AksesService.putAkses(akses)
    commit('EDT_AKSES', akses)
  },
  async deleteAkses({ commit }, id) {
    await AksesService.deleteAkses(id)
    commit('DEL_AKSES', id)
  }
}
