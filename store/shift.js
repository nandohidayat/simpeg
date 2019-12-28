export const namespaced = true

export const state = () => ({
  shifts: [],
  departemen: []
})

export const mutations = {
  SET_SHIFTS(state, shifts) {
    state.shifts = shifts
  },
  ADD_SHIFT(state, shift) {
    state.shifts.push(shift)
  },
  EDT_SHIFT(state, shift) {
    const idx = state.shifts.findIndex((b) => b.id_shift === shift.id_shift)
    state.shifts[idx].mulai = shift.mulai
    state.shifts[idx].selesai = shift.selesai
    state.shifts[idx].kode = shift.kode
  },
  DEL_SHIFT(state, id) {
    state.shifts = state.shifts.filter((b) => b.id_shift !== id)
  },
  SET_DEPARTEMEN(state, shift) {
    state.departemen = shift
  }
}

export const actions = {
  async fetchShifts({ commit }) {
    const res = await this.$api.shift.index()
    commit('SET_SHIFTS', res.data)
  },
  async createShift({ commit }, shift) {
    const res = await this.$api.shift.create(shift)
    commit('ADD_SHIFT', res.data)
  },
  async updateShift({ commit }, shift) {
    await this.$api.shift.update(shift.id_shift, shift)
    commit('EDT_SHIFT', shift)
  },
  async deleteShift({ commit }, id) {
    await this.$api.shift.delete(id)
    commit('DEL_SHIFT', id)
  },
  async fetchDepartemen({ commit }, id) {
    const res = await this.$api.shiftDepartemen.show(id)
    commit('SET_DEPARTEMEN', res.data)
  },
  async createDepartemen({ commit }, shift) {
    await this.$api.shiftDepartemen.create(shift)
  }
}
