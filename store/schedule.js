export const namespaced = true

export const state = () => ({
  schedules: [],
  dept: [],
  shift: [],
  header: []
})

export const mutations = {
  SET_SCHEDULES(state, schedules) {
    state.schedules = schedules.schedule
    state.shift = schedules.shift
    state.header = schedules.header

    if (state.dept.length === 0) state.dept = schedules.dept
  },
  RESET(state) {
    state.schedules = []
  }
}

export const actions = {
  async fetchSchedules({ commit, rootState }, date) {
    rootState.absen.absen = []
    rootState.absen.pendapatan = 0
    commit('RESET')
    const res = await this.$api.schedule.index(date)
    commit('SET_SCHEDULES', res.data)
  },
  async createSchedules({ commit }, { schedules, date }) {
    await this.$api.schedule.create(schedules, date)
  }
}
