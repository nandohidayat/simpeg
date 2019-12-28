export const namespaced = true

export const state = () => ({
  schedules: [],
  ruang: undefined,
  header: []
})

export const mutations = {
  SET_SCHEDULES(state, schedules) {
    state.schedules = schedules.schedule
    state.ruang = schedules.ruang
    state.header = schedules.header
  },
  RESET(state) {
    state.schedules = []
  }
}

export const actions = {
  async fetchSchedules({ commit }, date) {
    commit('RESET')
    const res = await this.$api.schedule.index(date)
    commit('SET_SCHEDULES', res.data)
  },
  async createSchedules({ commit }, { schedules, date }) {
    await this.$api.schedule.create(schedules, date)
  }
}
