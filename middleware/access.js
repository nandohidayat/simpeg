export default ({ store, route, redirect }) => {
  if (
    store.state.auth.loggedIn &&
    !store.state.auth.user.akses.includes(route.path)
  ) {
    return redirect('/404')
  }
}
