import axios from 'axios'
import https from 'https'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const instance = axios.create({
  baseURL:
    'https://x.apigoat.com/p/test_max/api/v1/',
  headers: {
    common: {
      'Content-type': 'application/json',
      Accept: 'application/json'
    }
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null
}

const token = getToken()

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default instance
