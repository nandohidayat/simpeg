export const namespaced = true

export const state = () => ({
  schedules: []
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
      (b) => b.id_schedule_change === schedule.id_schedule_change
    )
    state.schedules[idx].status = schedule.status
  },
  DEL_SCHEDULE(state, id) {
    state.schedules = state.schedules.filter((b) => b.id_schedule_change !== id)
  },
  RESET(state) {
    state.schedules = []
  }
}

export const actions = {
  async fetchSchedules({ commit }, date) {
    const res = await this.$api.scheduleChange.index(date)
    commit('SET_SCHEDULES', res.data)
  },
  async createSchedule({ rootState, commit, dispatch }, schedule) {
    schedule.pemohon = rootState.user.user.id
    schedule.status = 1
    await this.$api.scheduleChange.create(schedule)

    await dispatch('fetchSchedules', {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      dept: schedule.dept
    })
  },
  async updateSchedule({ commit, dispatch }, schedule) {
    await this.$api.scheduleChange.update(schedule.id_schedule_change, schedule)
    commit('EDT_SCHEDULE', schedule)

    if (parseInt(schedule.status) === 3) return

    await Promise.all([
      dispatch(
        'schedule/fetchSchedules',
        {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          dept: schedule.dept
        },
        { root: true }
      ),
      dispatch('fetchSchedules', {
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        dept: schedule.dept
      })
    ])
  },
  async deleteSchedule({ commit }, id) {
    await this.$api.scheduleChange.delete(id)
    commit('DEL_SCHEDULE', id)
  }
}
