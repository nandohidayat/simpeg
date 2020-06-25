const karyawanId = (store, route) => {
  if (
    route.name === 'karyawan-id' &&
    (route.params.id === store.state.user.user.nik ||
      store.state.user.akses.includes('/karyawan'))
  ) {
    return true
  }
  return false
}

export default ({ store, route, redirect }) => {
  const all = ['/', '/404', '/schedule/print']

  if (route.path !== '/login') {
    if (!store.getters['user/isLogged']) {
      return redirect({ name: 'login' })
    }
    if (!all.includes(route.path)) {
      if (
        !store.state.user.akses.includes(route.path) &&
        !karyawanId(store, route)
      ) {
        return redirect('/404')
      }
    }
  }
}
