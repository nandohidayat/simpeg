import jsCookie from 'js-cookie'

import UserService from '@/services/UserService'

export const state = () => ({
  user: undefined,
  token: undefined,
  menu: [],
  akses: [],
  karyawan: {}
})

export const mutations = {
  SET_USER(state, user) {
    jsCookie.set('user', JSON.stringify(user))
    this.$axios.setToken(user.token, 'Bearer')
    state.token = user.token
    state.user = user.user
    state.menu = user.menu
    state.akses = user.akses
  },
  REMOVE_USER(state) {
    jsCookie.remove('user')
    location.reload()
  },
  SET_KARYAWAN(state, user) {
    state.karyawan = user
  }
}

export const actions = {
  async register({ commit }, user) {
    await UserService.register(user)
  },
  async login({ commit }, user) {
    const res = await this.$auth.login(user)
    commit('SET_USER', res)
  },
  logout({ commit }) {
    this.$auth.logout()
    commit('REMOVE_USER')
  },
  async fetchUser({ commit }, nik) {
    const res = await UserService.user(nik)
    commit('SET_KARYAWAN', res.data.data)
  }
}

export const getters = {
  isLogged(state) {
    return state.token !== undefined
  }
}
