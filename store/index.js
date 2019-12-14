import { parse } from 'cookieparser'

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (process.server && process.static) return
    if (!req.headers.cookie) return
    if (req.headers.cookie) {
      const parsed = parse(req.headers.cookie)
      const userCookie = parsed.user
      if (!userCookie) return

      const user = JSON.parse(userCookie)
      await commit('user/SET_USER', user)

      this.$axios.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response.status === 401) {
            this.$store.dispatch('user/logout')
            this.$router.push('/login')
          }
          return Promise.reject(error)
        }
      )
    }
  }
}
