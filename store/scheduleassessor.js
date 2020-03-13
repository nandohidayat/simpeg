export const namespaced = true

export const state = () => ({
  schedules: []
})

export const mutations = {
  SET_SCHEDULES(state, schedules) {
    state.schedules = schedules
  },
  DEL_SCHEDULE(state, id) {
    state.schedules = state.schedules.filter(
      (b) => b.id_schedule_assessor !== id
    )
  }
}

export const actions = {
  async fetchSchedules({ commit }) {
    const res = await this.$api.scheduleAssessor.index()
    commit('SET_SCHEDULES', res.data)
  },
  async createSchedule({ commit }, schedule) {
    const res = await this.$api.scheduleAssessor.create(schedule)
    commit('SET_SCHEDULES', res.data)
  },
  async updateSchedule({ commit }, schedule) {
    const res = await this.$api.scheduleAssessor.update(
      schedule.id_schedule_assessor,
      schedule
    )
    commit('SET_SCHEDULES', res.data)
  },
  async deleteSchedule({ commit }, schedule) {
    await this.$api.scheduleAssessor.delete(schedule.id_schedule_assessor)
    commit('DEL_SCHEDULE', schedule.id_schedule_assessor)
  }
}
