export default ({ store }, inject) => {
  const alert = (type, text) => {
    store.dispatch('notification/addNotif', {
      type,
      text
    })
  }
  inject('alert', alert)
}
