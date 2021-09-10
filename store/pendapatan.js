export const state = () => ({
  items: [],
  date: undefined,
  profil: undefined,
})

export const mutations = {
  SET_ITEMS(state, { pendapatan, profil, date }) {
    state.items = pendapatan
    state.date = date
    state.profil = profil
  },
}

export const actions = {
  async fetchItems({ commit }, query) {
    const res = await this.$api.pendapatan.index(query)
    commit('SET_ITEMS', res.data)
  },
  async updateItem({ state }, { list, tipe }) {
    await this.$api.pendapatan.update(list, {
      tipe,
      pendapatan: state.items,
    })
  },
}
