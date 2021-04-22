export const state = () => ({
  items: [],
  profil: undefined,
})

export const mutations = {
  SET_ITEMS(state, { pendapatan, profil }) {
    state.profil = profil
    state.items = pendapatan
  },
}

export const actions = {
  async fetchItems({ commit }, query) {
    const res = await this.$api.pendapatan.index(query)
    commit('SET_ITEMS', res.data)
  },
  async updateItem({ state }, { list }) {
    await this.$api.pendapatan.update('1', {
      list,
      pendapatan: state.items,
    })
  },
}
