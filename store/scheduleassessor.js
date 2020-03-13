export const namespaced = true

export const state = () => ({
  schedule: []
})

export const mutations = {
  SET_SCHEDULES(state, schedules) {
    state.schedules = schedules
  },
  ADD_SCHEDULE(state, schedule) {
    state.schedules.push(schedule)
  },
  EDT_SCHEDULE(state, schedule) {
    const idx = state.schedules.findIndex(
      (b) => b.id_schedule === schedule.id_schedule
    )
    state.schedules[idx] = schedule
  },
  DEL_SCHEDULE(state, id) {
    state.schedules = state.schedules.filter((b) => b.id_schedule !== id)
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
