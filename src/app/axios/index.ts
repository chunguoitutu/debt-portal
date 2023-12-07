import axios from 'axios'
import Cookies from 'js-cookie'

const request = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  headers: {'Content-Type': 'application/json'},
})

request.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    const currentCompany = Cookies.get('company_id') || 0

    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
      config.headers['Company'] = +currentCompany
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default request
