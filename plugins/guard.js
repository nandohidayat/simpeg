export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    if (error.response !== undefined && error.response.status === 401) {
      redirect('/login')
    }
  })
}
