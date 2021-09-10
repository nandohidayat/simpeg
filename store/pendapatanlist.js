export const state = () => ({
  items: [],
  copy: [],
})

export const mutations = {
  SET_ITEMS(state, items) {
    state.items = items
    state.copy = items
  },
  SET_COPYS(state, items) {
    state.copy = items
  },
  ADD_ITEM(state, item) {
    state.items.push(item)
  },
  EDT_ITEM(state, item) {
    state.items = state.items.map((s) =>
      parseInt(s.id_pendapatan_list) !== parseInt(item.id_pendapatan_list)
        ? s
        : item
    )
  },
  DEL_ITEM(state, id) {
    state.items = state.items.filter(
      (p) => parseInt(p.id_pendapatan_list) !== parseInt(id)
    )
  },
}

export const actions = {
  async fetchItems({ commit }, query) {
    const res = await this.$api.pendapatanlist.index(query)
    if (query.copy) {
      commit('SET_COPYS', res.data)
    }
    commit('SET_ITEMS', res.data)
  },
  async createItem({ commit }, submit) {
    await this.$api.pendapatanlist.create(submit)
  },
  async updateItem({ commit }, submit) {
    let res
    if (submit.param) {
      res = await this.$api.pendapatanlist.update(
        submit.submit.id_pendapatan_list,
        submit.submit,
        submit.param
      )
    } else {
      res = await this.$api.pendapatanlist.update(
        submit.id_pendapatan_list,
        submit
      )
    }

    commit('EDT_ITEM', res.data)
  },
  async deleteItem({ commit }, id) {
    await this.$api.pendapatanlist.delete(id)
    commit('DEL_ITEM', id)
  },
}
