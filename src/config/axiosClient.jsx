import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://front-test-api.herokuapp.com/api/'
})

export default axiosClient
