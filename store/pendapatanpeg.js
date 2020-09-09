export const state = () => ({
  tipe: [
    { value: 'format_personalia', text: 'Format Personalia' },
    { value: 'format_keuangan', text: 'Format Keuangan' },
  ],
  header: [],
  pendapatans: [],
})

export const mutations = {
  SET_PENDAPATAN(state, pendapatan) {
    state.header = pendapatan.header
    state.pendapatans = pendapatan.data
  },
}

export const actions = {
  async fetchPendapatans({ commit }, pendapatan) {
    const res = await this.$api.pendapatanpeg.index(pendapatan)
    commit('SET_PENDAPATAN', res.data)
  },
  exportTemplate(ctx, { profil, tipe }) {
    const win = window.open(
      `${this.$axios.defaults.baseURL}pendapatanpeg/profilp?id_profilp=${profil}&tipe_form=${tipe}`,
      '_blank'
    )
    win.focus()
  },
  exportPendapatan(ctx, { profil, tipe, date }) {
    const win = window.open(
      `${this.$axios.defaults.baseURL}pendapatanpeg/pendapatan?id_profilp=${profil}&tipe_form=${tipe}&bulan_kirim=${date}`,
      '_blank'
    )
    win.focus()
  },
}
