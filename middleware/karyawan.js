const karyawanId = (auth, route) => {
  if (
    route.name === 'karyawan-id' &&
    (route.params.id === auth.user.nik || auth.user.akses.includes('/karyawan'))
  ) {
    return true
  }
  return false
}

export default ({ store, route, redirect }) => {
  if (store.state.auth.loggedIn && !karyawanId(store.state.auth, route)) {
    return redirect('/404')
  }
}
