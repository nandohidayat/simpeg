export default ($axios) => () => ({
  user(id) {
    return $axios.$get(`user/${id}`)
  },
  password(id, payload) {
    return $axios.$put(`password/${id}`, payload)
  },
  reset(id) {
    return $axios.$put(`reset/${id}`)
  },
  delete(id) {
    return $axios.delete(`delete/${id}`)
  },
})
