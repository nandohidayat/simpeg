export const namespaced = true

export const state = () => ({
  schedules: [],
  header: [],
  weekend: [],
  holiday: []
})

export const mutations = {
  SET_SCHEDULES(state, schedules) {
    state.schedules = schedules.schedule
    state.header = schedules.header
    state.weekend = schedules.weekend.map((i) => parseInt(i))
    state.holiday = schedules.holiday.map((i) => parseInt(i))
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

    if (res.data.dept !== undefined)
      rootState.departemen.departemens = res.data.dept
    rootState.shift.departemen = res.data.shift.map((i) => parseInt(i))

    commit('SET_SCHEDULES', res.data)

    rootState.karyawan.karyawans = res.data.karyawan
    rootState.schedulerequest.schedule = res.data.assessor
  },
  async createSchedules({ commit }, { schedules, date }) {
    await this.$api.schedule.create(schedules, date)
  },
  async exportSchedules({ commit }, id) {
    await this.$api.schedule.export(id)
  },
  async printSchedules({ commit, rootState }, query) {
    const res = await this.$api.schedule.print(query)
    commit('SET_SCHEDULES', res.data)
    rootState.shift.shifts = res.data.shift
    rootState.departemen.departemen = res.data.dept
  }
}
