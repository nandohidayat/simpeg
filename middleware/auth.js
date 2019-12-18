const karyawanId = (store, route) => {
  if (
    route.name === 'karyawan-id' &&
    route.params.id !== store.state.user.user.nik &&
    !store.state.user.akses.includes('/karyawan')
  ) {
    return false
  }
  return true
}

export default ({ store, route, redirect }) => {
  const all = ['/', '/login', '/404']

  if (!store.getters['user/isLogged']) {
    return redirect('/login')
  }

  if (
    !all.includes(route.path) &&
    !store.state.user.akses.includes(route.path) &&
    !karyawanId(store, route)
  ) {
    return redirect('/404')
  }
}
