export default ({ store, route, redirect }) => {
  const all = ['/', '/login', '/404']

  if (!store.getters['user/isLogged']) {
    return redirect('/login')
  }

  if (
    !all.includes(route.path) &&
    !store.state.user.akses.includes(route.path)
  ) {
    return redirect('/404')
  }
}
