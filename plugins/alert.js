export default ({ store }, inject) => {
  const alert = (type, message) => {
    if (message.isAxiosError) {
      message = message.response.data.message
    }
    store.dispatch('notification/addNotif', {
      type,
      message,
    })
  }
  inject('alert', alert)
}
