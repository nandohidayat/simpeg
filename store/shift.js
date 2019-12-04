import ShiftService from '@/services/ShiftService.js'

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
    const res = await ShiftService.getShifts()
    commit('SET_SHIFTS', res.data.data)
  },
  async createShift({ commit }, shift) {
    const res = await ShiftService.postShift(shift)
    commit('ADD_SHIFT', res.data.data)
  },
  async updateShift({ commit }, shift) {
    await ShiftService.putShift(shift)
    commit('EDT_SHIFT', shift)
  },
  async deleteShift({ commit }, id) {
    await ShiftService.deleteShift(id)
    commit('DEL_SHIFT', id)
  },
  async fetchDepartemen({ commit }, id) {
    const res = await ShiftService.getDepartemen(id)
    commit('SET_DEPARTEMEN', res.data.data)
  },
  async updateDepartemen({ commit }, shift) {
    await ShiftService.postDepartemen(shift)
  }
}
