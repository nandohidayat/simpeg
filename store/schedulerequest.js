export const namespaced = true

export const state = () => ({
  status: 0
})

export const mutations = {
  EDT_SCHEDULE(state, schedule) {
    state.status = schedule
  }
}

export const actions = {
  async createSchedule({ commit }, schedule) {
    await this.$api.scheduleRequest.create(schedule)
    commit('EDT_SCHEDULE', 1)
  },
  async updateSchedule({ commit }, schedule) {
    await this.$api.scheduleRequest.update(
      schedule.id_schedule_request,
      schedule.status
    )
    commit('EDT_SCHEDULE', schedule.status)
  },
  async deleteSchedule({ commit }, id) {
    await this.$api.scheduleRequest.delete(id)
    commit('EDT_SCHEDULE', 0)
  }
}
