export const namespaced = true

export const state = () => ({
  order: [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
  ],
  id: [],
  nama: [],
  day: 30,
  shift: [],
  job: [],
  jam: [],
  weekend: [],
  holiday: []
})

export const mutations = {
  SET_SCHEDULES(
    state,
    { id, nama, day, shift, job, jam, weekend, holiday, ass }
  ) {
    state.id = id
    state.nama = nama
    state.day = day
    state.shift = shift
    state.job = job
    state.jam = jam
    state.weekend = weekend.map((i) => parseInt(i))
    state.holiday = holiday.map((i) => parseInt(i))
  },
  RESET(state) {
    state.nama = []
    state.shift = []
    state.job = []
    state.jam = []
  },
  UPDATE_SCHEDULES(state, { staff, day, value, type }) {
    if (day.length === 1) {
      state[type][staff][day[0]] = value
    } else {
      for (let i = day[0]; i <= day[1]; i++) {
        state[type][staff][i] = value
      }
    }
  }
}

export const actions = {
  async fetchSchedules({ commit, rootState }, date) {
    commit('RESET')

    const res = await this.$api.schedule.index(date)

    if (res.data.dept !== undefined)
      rootState.departemen.departemens = res.data.dept

    if (res.data.assessor !== undefined) {
      if (res.data.assessor.status === null) res.data.assessor.status = 0
      rootState.schedulerequest.schedule = res.data.assessor
    }

    commit('SET_SCHEDULES', res.data)
  },
  async updateSchedule({ state }, { dept, year, month }) {
    const schedule = {
      year,
      month,
      id: state.id,
      shift: state.shift,
      job: state.job
    }
    await this.$api.schedule.update(dept, schedule)
  },
  async printSchedules({ commit, rootState }, date) {
    const res = await this.$api.schedule.print(date)

    commit('SET_SCHEDULES', res.data)

    rootState.departemen.departemen = res.data.dept
  }
}

export const getters = {
  dayColor: (state) => (id) => {
    if (state.weekend.includes(id)) return 'red'
    if (state.holiday.includes(id)) return 'red lighten-3'
    return 'white'
  }
}
