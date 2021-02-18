export const state = () => ({
  items: [],
})

export const mutations = {
  SET_ITEMS(state, items) {
    state.items = items
  },
}

export const actions = {
  async fetchItems({ commit }, query) {
    const res = await this.$api.pendapatan.index(query)
    commit('SET_ITEMS', res.data)
  },
}
