import { parse } from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (process.server && process.static) return
    if (!req.headers.cookie) return
    if (req.headers.cookie) {
      const parsed = parse(req.headers.cookie)
      const userCookie = parsed.user
      if (!userCookie) return

      const user = JSON.parse(userCookie)

      commit('user/SET_USER', user)
    }
  }
}
