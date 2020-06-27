export const state = () => ({})

export const mutations = {}

export const actions = {
  async login(ctx, user) {
    await this.$auth.loginWith('local', { data: user })
  },
  logout({ commit }) {
    this.$auth.logout()
  },
}
