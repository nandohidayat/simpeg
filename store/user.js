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

export const getters = {
  hadOption(state) {
    return function (id) {
      return this.$auth.user.option.map((i) => parseInt(i)).includes(id)
    }
  },
}
