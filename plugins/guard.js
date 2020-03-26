export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    if (!process.server) {
      if (window.location.hostname.split('.')[2] === '0') {
        $axios.baseUrl = 'http://192.168.0.106:8000/api/'
      }
      if (window.location.hostname.split('.')[2] === '1') {
        $axios.baseUrl = 'http://192.168.1.7:8000/api/'
      }
    }
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    if (error.response !== undefined && error.response.status === 401) {
      redirect('/login')
    }
  })
}
