import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8000/',
  // timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default client
