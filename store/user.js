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
  hadAkses: (state, getters, rootState) => (id) => {
    return rootState.auth.user
      ? rootState.auth.user.akses.map((i) => parseInt(i)).includes(id)
      : false
  },
  hadMenu: (state, getters, rootState) => (id) => {
    return rootState.auth.user
      ? rootState.auth.user.menu.map((i) => parseInt(i)).includes(id)
      : false
  },
  hadSubmenu: (state, getters, rootState) => (id) => {
    return rootState.auth.user
      ? rootState.auth.user.submenu.map((i) => parseInt(i)).includes(id)
      : false
  },
}
