export const namespaced = true

export const state = () => ({
  shifts: [],
  departemen: [],
})

export const mutations = {
  SET_SHIFTS(state, shifts) {
    state.shifts = shifts
  },
  ADD_SHIFT(state, shift) {
    state.shifts.push(shift)
  },
  EDT_SHIFT(state, shift) {
    state.shifts = state.shifts.map((s) =>
      s.id_shift !== shift.id_shift ? s : shift
    )
  },
  DEL_SHIFT(state, id) {
    state.shifts = state.shifts.filter((b) => b.id_shift !== id)
  },
  SET_DEPARTEMEN(state, shift) {
    state.departemen = shift.map((i) => parseInt(i))
  },
}

export const actions = {
  async fetchShifts({ commit }) {
    const res = await this.$api.shift.index()
    commit('SET_SHIFTS', res.data)
  },
  async fetchShift({ commit }, id) {
    const res = await this.$api.shift.show(id)
    commit('SET_DEPARTEMEN', res.data)
  },
  async createShift({ commit }, shift) {
    const res = await this.$api.shift.create(shift)
    commit('ADD_SHIFT', res.data)
  },
  async updateShift({ commit }, shift) {
    const res = await this.$api.shift.update(shift.id_shift, shift)
    commit('EDT_SHIFT', res)
  },
  async deleteShift({ commit }, shift) {
    await this.$api.shift.delete(shift.id_shift)
    commit('DEL_SHIFT', shift.id_shift)
  },
  async fetchDepartemen({ commit }, id) {
    const res = await this.$api.shiftDepartemen.show(id)
    commit('SET_DEPARTEMEN', res.data)
  },
  async updateDepartemen({ commit }, { departemen, shift }) {
    await this.$api.shiftDepartemen.update(departemen, { shift })
  },
}

export const getters = {
  fShift: (state) => (nonull = false) => {
    const shift = state.departemen.map((d) =>
      state.shifts.find((s) => s.id_shift === d)
    )
    return nonull
      ? shift
      : [{ id: undefined, kode: undefined, color: 'white' }, ...shift]
  },
  getKode: (state) => (id) => {
    const shift = state.shifts.find(
      (s) => parseInt(s.id_shift) === parseInt(id)
    )
    return shift ? shift.kode : undefined
  },
  getBgColor: (state) => (id) => {
    const shift = state.shifts.find(
      (s) => parseInt(s.id_shift) === parseInt(id)
    )
    return shift.color !== null ? shift.color : 'white'
  },
}
