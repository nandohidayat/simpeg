export default ({ $axios }) => {
  if (process.client) {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    let port
    if (hostname.split('.')[0] === '117') {
      port = ':8957'
    }
    const url = `${protocol}//${hostname}${
      port || ''
    }/php74/simpeg/simpeg_backend/public/api/`
    $axios.defaults.baseURL = url
  }
}
