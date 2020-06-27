export const namespaced = true

export const state = () => ({
  schedules: [],
})

export const mutations = {
  SET_SCHEDULES(state, schedules) {
    state.schedules = schedules
  },
  ADD_SCHEDULE(state, schedule) {
    state.schedules.push(schedule)
  },
  EDT_SCHEDULE(state, schedule) {
    state.schedules = state.schedules.map((s) =>
      s.id_schedule_access !== schedule.id_schedule_access ? s : schedule
    )
  },
  DEL_SCHEDULE(state, id) {
    state.schedules = state.schedules.filter((b) => b.id_schedule_access !== id)
  },
}

export const actions = {
  async fetchSchedules({ commit }) {
    const res = await this.$api.scheduleAccess.index()
    commit('SET_SCHEDULES', res.data)
  },
  async createSchedule({ commit }, schedule) {
    const res = await this.$api.scheduleAccess.create(schedule)
    commit('ADD_SCHEDULE', res.data)
  },
  async updateSchedule({ commit }, schedule) {
    const res = await this.$api.scheduleAccess.update(
      schedule.id_schedule_access,
      schedule
    )
    commit('EDT_SCHEDULE', res.data)
  },
  async deleteSchedule({ commit }, schedule) {
    await this.$api.scheduleAccess.delete(schedule.id_schedule_access)
    commit('DEL_SCHEDULE', schedule.id_schedule_access)
  },
}
