export default ($axios) => () => ({
  login(payload) {
    return $axios.$post(`login`, payload)
  },
  logout() {
    return $axios.$get(`logout`)
  },
  register(payload) {
    return $axios.$post(`register`, payload)
  },
  user(id) {
    return $axios.$get(`user/${id}`)
  },
})
