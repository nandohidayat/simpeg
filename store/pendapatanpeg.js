export const state = () => ({
  tipe: [
    { value: 'format_personalia', text: 'Format Personalia' },
    { value: 'format_keuangan', text: 'Format Keuangan' },
  ],
})

export const mutations = {}

export const actions = {
  exportTemplate(ctx, { profil, tipe }) {
    const win = window.open(
      `${this.$axios.defaults.baseURL}pendapatanpeg/profilp?id_profilp=${profil}&tipe_form=${tipe}`,
      '_blank'
    )
    win.focus()
  },
}
