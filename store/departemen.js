export const namespaced = true

export const state = () => ({
  departemens: [],
  departemen: undefined,
})

export const mutations = {
  SET_DEPARTEMENS(state, departemens) {
    state.departemens = departemens
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
  },
}

export const actions = {
  async fetchDepartemens({ commit }, query) {
    const res = await this.$api.departemen.index(query)
    commit('SET_DEPARTEMENS', res.data)
  },
  async createDepartemen({ commit }, departemen) {
    const res = await this.$api.departemen.create(departemen)
    commit('ADD_DEPARTEMEN', res.data)
  },
  async updateDepartemen({ commit }, departemen) {
    await this.$api.departemen.update(departemen.id_departemen, departemen)
    commit('EDT_DEPARTEMEN', departemen)
  },
  async deleteDepartemen({ commit }, id) {
    await this.$api.departemen.delete(id)
    commit('DEL_DEPARTEMEN', id)
  },
}
