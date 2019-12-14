export default {
  register(user) {
    return this.$axios.$post('/api/register', user)
  },
  login(user) {
    return this.$axios.post('/api/login', user)
  },
  logout() {
    return this.$axios.$get('/api/logout')
  },
  user(nik) {
    return this.$axios.$get(`/api/user/${nik}`)
  }
}
