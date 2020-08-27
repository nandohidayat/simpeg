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
      parseInt(s.id_schedule_access) !== parseInt(schedule.id_schedule_access)
        ? s
        : schedule
    )
  },
  DEL_SCHEDULE(state, id) {
    state.schedules = state.schedules.filter(
      (b) => parseInt(b.id_schedule_access) !== parseInt(id)
    )
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
  async deleteSchedule({ commit }, id) {
    await this.$api.scheduleAccess.delete(id)
    commit('DEL_SCHEDULE', id)
  },
}
