export const namespaced = true

export const state = () => ({
  schedule: undefined
})

export const mutations = {
  EDT_SCHEDULE(state, schedule) {
    state.schedule.status = schedule
  }
}

export const actions = {
  async updateSchedule({ commit }, { dept, year, month, status }) {
    await this.$api.scheduleRequest.update(dept, { year, month, status })
    commit('EDT_SCHEDULE', status)
  }
}
