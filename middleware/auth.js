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
  const all = ['/', '/404']

  if (route.path !== '/login') {
    if (!all.includes(route.path)) {
      if (!store.getters['user/isLogged']) {
        return redirect({ name: 'login' })
      }

      if (
        !store.state.user.akses.includes(route.path) &&
        !karyawanId(store, route)
      ) {
        return redirect('/404')
      }
    }
  }
}
