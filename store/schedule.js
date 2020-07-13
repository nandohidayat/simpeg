import Vue from 'vue'

export const state = () => ({
  overlay: false,
  order: [],
  id: [],
  nama: [],
  day: 30,
  shift: [],
  job: [],
  jam: [],
  weekend: [],
  holiday: [],
})

export const mutations = {
  SET_SCHEDULES(
    state,
    { order, id, nama, day, shift, job, jam, weekend, holiday }
  ) {
    state.order = order.map(Number)
    state.id = id
    state.nama = nama
    state.day = day
    state.shift = shift
    state.job = job
    state.jam = jam
    state.weekend = weekend.map(Number)
    state.holiday = holiday.map(Number)
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
  },
  TOOGLE_OVERLAY(state, status) {
    state.overlay = status
  },
  REORDER(state, { idx, type }) {
    if (type === 'up') {
      const temp = state.order[idx - 1]
      Vue.set(state.order, idx - 1, state.order[idx])
      Vue.set(state.order, idx, temp)
    } else if (type === 'down') {
      const temp = state.order[idx]
      Vue.set(state.order, idx, state.order[idx + 1])
      Vue.set(state.order, idx + 1, temp)
    } else if (type === 'add') {
      state.order.splice(idx + 1, 0, NaN)
    } else {
      state.order.splice(idx, 1)
    }
  },
}

export const actions = {
  async fetchSchedules({ commit, rootState, rootGetter }, date = {}) {
    commit('TOOGLE_OVERLAY', true)

    if (rootGetter.user.hadOption(6)) {
      date.semua = 1
    }

    const res = await this.$api.schedule.index(date, date)

    if (res.data.dept !== undefined)
      rootState.departemen.departemens = res.data.dept

    if (res.data.assessor) {
      if (res.data.assessor.status === null) res.data.assessor.status = 0
      rootState.schedulerequest.schedule = res.data.assessor
    } else {
      rootState.schedulerequest.schedule = null
    }

    commit('SET_SCHEDULES', res.data)

    commit('TOOGLE_OVERLAY', false)
  },
  async updateSchedule({ state }, { dept, year, month }) {
    const schedule = {
      year,
      month,
      id: state.id,
      shift: state.shift,
      job: state.job,
    }
    await this.$api.schedule.update(dept, schedule)
  },
  async printSchedules({ commit, rootState }, date) {
    const res = await this.$api.schedule.print(date)

    commit('SET_SCHEDULES', res.data)

    rootState.departemen.departemen = res.data.dept
  },
  async exportSchedule(ctx, date) {
    await this.$api.schedule.export(date)
  },
  async updateScheduleOrder({ state }, { dept }) {
    await this.$api.scheduleOrder.update(dept, {
      order: state.order.join(),
    })
  },
}

export const getters = {
  dayColor: (state) => (id) => {
    if (state.weekend.includes(id)) return 'red'
    if (state.holiday.includes(id)) return 'red lighten-3'
    return 'white'
  },
  lastData: (state) => (id) => {
    return state.order.length - 1 === id
  },
}
