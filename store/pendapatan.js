export const state = () => ({
  items: [],
  cache: [],
})

export const mutations = {
  INITIALS(state, items) {
    state.items = items
    state.cache = items.map((item) => item)
  },
  SET_ITEMS(state, items) {
    state.items = items
  },
  SET_CACHE(state, items) {
    state.cache = items
  },
}

export const actions = {
  async fetchItems({ commit }, query) {
    const res = await this.$api.pendapatan.index(query)
    commit('INITIALS', res.data)
  },
}
