export const state = () => ({
  logs: [],
})

export const mutations = {
  SET_LOGS(state, logs) {
    state.logs = logs
  },
  ADD_LOG(state, log) {
    state.logs.push(log)
  },
  EDT_LOG(state, log) {
    state.logs = state.logs.map((s) =>
      parseInt(s.id_log_departemen) !== parseInt(log.id_log_departemen)
        ? s
        : log
    )
  },
  DEL_LOG(state, id) {
    state.logs = state.logs.filter(
      (b) => parseInt(b.id_log_departemen) !== parseInt(id)
    )
  },
}

export const actions = {
  async fetchLog({ commit }, id) {
    const res = await this.$api.logdepartemen.show(id)
    commit('SET_LOGS', res.data)
  },
  async createLog({ commit }, log) {
    const res = await this.$api.logdepartemen.create(log)
    commit('ADD_LOG', res.data)
  },
  async updateLog({ commit }, log) {
    const res = await this.$api.logdepartemen.update(log.id_log_departemen, log)
    commit('EDT_LOG', res.data)
  },
  async deleteLog({ commit }, id) {
    await this.$api.logdepartemen.delete(id)
    commit('DEL_LOG', id)
  },
}
