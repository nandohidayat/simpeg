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
    state.departemens = state.departemens.map((g) =>
      g.id_dept !== departemen.id_dept ? g : departemen
    )
  },
  DEL_DEPARTEMEN(state, id) {
    state.departemens = state.departemens.filter((d) => d.id_dept !== id)
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
    const res = await this.$api.departemen.update(
      departemen.id_dept,
      departemen
    )
    commit('EDT_DEPARTEMEN', res.data)
  },
  async deleteDepartemen({ commit }, id) {
    await this.$api.departemen.delete(id)
    commit('DEL_DEPARTEMEN', id)
  },
}
