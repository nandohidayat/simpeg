export const namespaced = true

export const state = () => ({
  notifications: [],
  snackbar: false,
})

export const mutations = {
  ADD_NOTIF(state, notif) {
    state.notifications.push(notif)
    state.snackbar = true
  },
  DEL(state) {
    state.notifications.pop()
    state.snackbar = state.notifications.lenght !== 0
  },
}

export const actions = {
  addNotif({ commit }, notif) {
    commit('ADD_NOTIF', notif)
  },
  delNotif({ commit }) {
    commit('DEL')
  },
}
