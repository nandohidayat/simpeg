export default ({ store, route, redirect }) => {
  if (
    store.state.auth.loggedIn &&
    !store.state.auth.user.akses.includes('/karyawan')
  ) {
    return redirect('/404')
  }
}
