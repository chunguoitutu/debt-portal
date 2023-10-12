import axios from 'axios'
import Cookies from 'js-cookie'

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_LOCAL_BASE_URL
      : process.env.REACT_APP_API_URL,
  headers: {'Content-Type': 'application/json'},
})

if (Cookies.get('token')) {
  request.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`
}

export default request
