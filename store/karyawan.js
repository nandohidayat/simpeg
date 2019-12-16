export const namespaced = true

export const state = () => ({
  karyawans: [],
  karyawan: {}
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
  }
}

export const actions = {
  async fetchKaryawans({ commit }, { select }) {
    const res = await this.$karyawanApi.index(select)
    commit('SET_KARYAWANS', res.data.data)
  },
  async fetchKaryawan({ commit }, nik) {
    const res = await this.$karyawanApi.show(nik)
    commit('SET_KARYAWAN', res.data.data)
  },
  async createKaryawan({ commit, rootState }, karyawan) {
    await this.$karyawanApi.create(karyawan)

    const k = {
      ...karyawan,
      departemen: rootState.departemen.departemens.find(
        (d) => d.id_departemen === karyawan.id_departemen
      ).departemen,
      ruang: rootState.ruang.ruangs.find(
        (d) => d.id_ruang === karyawan.id_ruang
      ).ruang
    }

    commit('ADD_KARYAWAN', k)
  },
  async updateKaryawan({ commit, rootState }, karyawan) {
    await this.$karyawanApi.updaete(karyawan.nik, karyawan)

    const k = {
      ...karyawan,
      departemen: rootState.departemen.departemens.find(
        (d) => d.id_departemen === karyawan.id_departemen
      ).departemen,
      ruang: rootState.ruang.ruangs.find(
        (d) => d.id_ruang === karyawan.id_ruang
      ).ruang
    }

    commit('SET_KARYAWAN', k)
  },
  async deleteKaryawan({ commit }, nik) {
    await this.$karyawanApi.delete(nik)
  }
}
