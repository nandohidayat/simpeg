export const namespaced = true

export const state = () => ({
  schedule: undefined
})

export const mutations = {
  EDT_SCHEDULE(state, schedule) {
    state.schedule = schedule
  }
}

export const actions = {
  async updateSchedule({ commit }, schedule) {
    await this.$api.scheduleRequest.update(schedule.id, schedule)
    commit('EDT_SCHEDULE', schedule)
  }
}
