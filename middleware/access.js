export default ({ store, route, redirect }) => {
  const except = ['try']

  if (
    store.state.auth.loggedIn &&
    !store.state.auth.user.akses.includes(route.path) &&
    !except.includes(route.name)
  ) {
    return redirect('/404')
  }
}
