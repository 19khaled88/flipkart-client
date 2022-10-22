import axios from 'axios'
import { api } from './urlConfig'
const token = localStorage.getItem('token')
const axiosBaseUrl = axios.create({
  baseURL: api,
})
axiosBaseUrl.defaults.headers.common['Content-Type'] = 'multipart/form-data'

if (token) {
  axiosBaseUrl.defaults.headers.common['Authorization'] = token
} else {
  axiosBaseUrl.defaults.headers.common['Authorization'] = null
}

export default axiosBaseUrl
