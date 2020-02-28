export const namespaced = true

export const state = () => ({
  schedules: [],
  dept: [],
  shift: [],
  header: [],
  weekend: []
})

export const mutations = {
  SET_SCHEDULES(state, schedules) {
    state.schedules = schedules.schedule
    state.shift = schedules.shift
    state.header = schedules.header
    state.weekend = schedules.weekend

    if (schedules.dept !== undefined) state.dept = schedules.dept
  },
  RESET(state) {
    state.schedules = []
  }
}

export const actions = {
  async fetchSchedules({ commit, rootState }, date) {
    commit('RESET')
    rootState.absen.absen = []
    rootState.absen.pendapatan = 0
    rootState.schedulechange.schedules = []
    const res = await this.$api.schedule.index(date)
    commit('SET_SCHEDULES', res.data)
    rootState.karyawan.karyawans = res.data.karyawan
  },
  async createSchedules({ commit }, { schedules, date }) {
    await this.$api.schedule.create(schedules, date)
  },
  async exportSchedules({ commit }, id) {
    await this.$api.schedule.export(id)
  }
}
