export default ({ $axios, store }) => {
  if (process.server) {
    return
  }

  $axios.setToken(store.state.user.token, 'Bearer')
}
