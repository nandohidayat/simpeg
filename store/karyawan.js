export const namespaced = true

export const state = () => ({
  karyawans: [],
  karyawan: {},
})

export const mutations = {
  SET_KARYAWANS(state, karyawans) {
    state.karyawans = karyawans
  },
  SET_KARYAWAN(state, karyawan) {
    state.karyawan = karyawan
  },
  ADD_KARYAWAN(state, karyawan) {
    state.karyawans.push(karyawan)
  },
}

export const actions = {
  async fetchKaryawans({ commit }, params = {}) {
    const res = await this.$api.karyawan.index(params)
    commit('SET_KARYAWANS', res.data)
  },
  async fetchKaryawan({ commit }, id) {
    const res = await this.$api.karyawan.show(id)
    commit('SET_KARYAWAN', res.data)
  },
  async createKaryawan({ commit, rootState }, karyawan) {
    await this.$api.karyawan.create(karyawan)
  },
  async updateKaryawan({ commit, rootState }, karyawan) {
    await this.$api.karyawan.update(karyawan.id, karyawan)

    commit('SET_KARYAWAN', karyawan)
  },
  async deleteKaryawan({ commit }, nik) {
    await this.$api.karyawan.delete(nik)
  },
}

export const getters = {
  getKar: (state) => (id) => {
    const karyawan = state.karyawans.find((s) => s.id_pegawai === id)
    return karyawan ? karyawan.nm_pegawai : undefined
  },
}
