import UserService from '@/services/UserService.js'
import client from '@/services/client'

export const namespaced = true

export const state = {
  user: undefined,
  menu: [],
  akses: [],
  karyawan: {},
  loaded: false
}

export const mutations = {
  SET_USER(state, user) {
    localStorage.setItem('user', JSON.stringify(user))
    client.defaults.headers.common.Authorization = `Bearer ${user.token}`
    state.user = user.user
    state.menu = user.menu
    state.akses = user.akses
    state.loaded = true
  },
  REMOVE_USER() {
    localStorage.removeItem('user')
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
    const res = await UserService.login(user)
    commit('SET_USER', res.data)
  },
  logout({ commit }) {
    UserService.logout()
    commit('REMOVE_USER')
  },
  async fetchUser({ commit }, nik) {
    const res = await UserService.user(nik)
    commit('SET_KARYAWAN', res.data.data)
  }
}
