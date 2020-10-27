export const state = () => ({
  groups: [],
})

export const mutations = {
  SET_GROUPS(state, groups) {
    state.groups = groups
  },
  SET_GROUP(state, group) {
    state.akses = group
  },
  ADD_GROUP(state, group) {
    state.groups.push(group)
  },
  EDT_GROUP(state, group) {
    state.groups = state.groups.map((g) =>
      parseInt(g.id_group) !== parseInt(group.id_group) ? g : group
    )
  },
  DEL_GROUP(state, id) {
    state.groups = state.groups.filter(
      (b) => parseInt(b.id_group) !== parseInt(id)
    )
  },
}

export const actions = {
  async fetchGroups({ commit }) {
    const res = await this.$api.group.index()
    commit('SET_GROUPS', res.data)
  },
  async fetchGroup({ commit }, id) {
    const res = await this.$api.group.show(id)
    commit('SET_GROUP', res.data)
  },
  async createGroup({ commit }, group) {
    const res = await this.$api.group.create(group)
    commit('ADD_GROUP', res.data)
  },
  async updateGroup({ commit }, group) {
    const res = await this.$api.group.update(group.id_group, group)
    commit('EDT_GROUP', res.data)
  },
  async deleteGroup({ commit }, id) {
    await this.$api.group.delete(id)
    commit('DEL_GROUP', id)
  },
}
