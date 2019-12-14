export default ($axios) => () => ({
  login(payload) {
    return $axios.$post(`/login`, payload)
  },
  logout() {
    return $axios.$get('/logout')
  }
})
