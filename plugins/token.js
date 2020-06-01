export default ({ $axios, store }) => {
  if (process.server) {
    return
  }

  if (window.location.hostname.split('.')[2] === '0') {
    $axios.setBaseURL(
      'http://192.168.0.106/php74/sp360/SP360-server/public/api/'
    )
  }
  if (window.location.hostname.split('.')[2] === '1') {
    $axios.setBaseURL('http://192.168.1.7/php74/sp360/SP360-server/public/api/')
  }

  $axios.setToken(store.state.user.token, 'Bearer')
}
