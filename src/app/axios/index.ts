import axios from 'axios'

const LOCAL_BASE_URL = 'http://localhost:8080/api/v1'

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? LOCAL_BASE_URL : process.env.REACT_APP_API_URL,
  headers: {'Content-Type': 'application/json'},
})

export default request
