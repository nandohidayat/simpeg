export default ({ $axios, store }) => {
  if (process.server) {
    return
  }

  if (window.location.hostname.split('.')[2] === '0') {
    $axios.setBaseURL('http://192.168.0.216:8000/api/')
  }
  if (window.location.hostname.split('.')[2] === '1') {
    $axios.setBaseURL('http://192.168.1.216:8000/api/')
  }

  $axios.setToken(store.state.user.token, 'Bearer')
}
