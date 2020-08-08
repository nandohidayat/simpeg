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
      s.id_log_departemen !== log.id_log_departemen ? s : log
    )
  },
  DEL_LOG(state, id) {
    state.logs = state.logs.filter((b) => b.id_log_departemen !== id)
  },
}

export const actions = {
  async fetchLog({ commit }, id) {
    const res = await this.$api.logdepartemen.show(id)
    commit('SET_LOGS', res.data)
  },
  async createLog({ commit }, log) {
    const res = await this.$api.logdepartemen.create(log)
    commit('ADD_LOG', { ...log, id_log_departemen: res.data.id_log_departemen })
  },
  async updateLog({ commit }, log) {
    const res = await this.$api.logdepartemen.update(log.id_log_departemen, log)
    commit('EDT_LOG', res)
  },
  async deleteLog({ commit }, log) {
    await this.$api.logdepartemen.delete(log.id_log_departemen)
    commit('DEL_LOG', log.id_log_departemen)
  },
}
