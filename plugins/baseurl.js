export default ({ $axios }) => {
  if (process.client) {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = 8000
    const url = `${protocol}//${hostname}:${port}/api/`
    $axios.defaults.baseURL = url
  }
}
