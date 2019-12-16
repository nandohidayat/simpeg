const queryGenerator = (params) => {
  const entries = Object.entries(params)
  const arr = []
  for (const [key, value] of entries) {
    arr.push(`${key}=${value}&`)
  }
  return arr.join('')
}

export default ($axios) => (resource) => ({
  index(query) {
    return $axios.$get(`${resource}?${queryGenerator(query)}`)
  },

  show(id) {
    return $axios.$get(`${resource}/${id}`)
  },

  create(payload) {
    return $axios.$post(`${resource}`, payload)
  },

  update(id, payload) {
    return $axios.$post(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.$delete(`${resource}/${id}`)
  }
})
