import axios from 'axios'
import Cookies from 'js-cookie'

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_LOCAL_BASE_URL
      : process.env.REACT_APP_API_URL,
  headers: {'Content-Type': 'application/json'},
})

request.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default request