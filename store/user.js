export const state = () => ({})

export const mutations = {}

export const actions = {
  async login(ctx, user) {
    await this.$auth.loginWith('local', { data: user })
  },
  logout(ctx) {
    this.$auth.logout()
  },
  async password(ctx, password) {
    await this.$authModul.password(password.id, {
      current: password.current,
      password: password.password,
    })
  },
  async reset(ctx, id) {
    await this.$authModul.reset(id)
  },
  async delete(ctx, id) {
    await this.$authModul.delete(id)
  },
}

export const getters = {
  hadOption(state) {
    return function (id) {
      return this.$auth.user
        ? this.$auth.user.option.map((i) => parseInt(i)).includes(id)
        : []
    }
  },
}
