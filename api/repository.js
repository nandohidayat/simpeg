const queryGenerator = (query) => {
  if (Object.entries(query).length === 0 && query.constructor === Object)
    return ''

  const entries = Object.entries(query)
  const arr = []
  for (const [key, value] of entries) {
    arr.push(`${key}=${value}&`)
  }
  return '?' + arr.join('')
}

export default ($axios) => (resource) => ({
  index(query = {}) {
    return $axios.$get(`${resource}${queryGenerator(query)}`)
  },

  show(id, query = {}) {
    return $axios.$get(`${resource}/${id}${queryGenerator(query)}`)
  },

  create(payload, query = {}) {
    return $axios.$post(`${resource}${queryGenerator(query)}`, payload)
  },

  update(id, payload) {
    return $axios.$put(`${resource}/${id}`, payload)
  },

  delete(id) {
    return $axios.$delete(`${resource}/${id}`)
  }
})
