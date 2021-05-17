export const state = () => ({
  items: [],
  date: undefined,
  profil: undefined,
  edit: undefined,
})

export const mutations = {
  SET_ITEMS(state, { pendapatan, profil, date, edit }) {
    state.items = pendapatan
    state.date = date
    state.profil = profil
    state.edit = edit
  },
  SET_EDIT(state, edit) {
    // eslint-disable-next-line camelcase
    const { id_pegawai, nm_pegawai } = this.$auth.user
    state.edit = edit === 1 ? { id_pegawai, nm_pegawai } : undefined
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
