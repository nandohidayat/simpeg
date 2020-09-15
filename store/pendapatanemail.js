export const state = () => ({
  emails: [],
})

export const mutations = {
  SET_EMAILS(state, emails) {
    state.emails = emails
  },
}

export const actions = {
  async fetchEmails({ commit }, query) {
    const res = await this.$api.pendapatanemail.index(query)
    commit('SET_EMAILS', res.data)
  },
}
