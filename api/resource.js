import axios from 'axios'
// import Cookie from 'universal-cookie'
import handler from './handler'
// import * as AUTHENTICATION from '~/store-namespace/authentication/types'

function createResource () {
  const instance = axios.create({
    baseURL: '/api/',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  instance.interceptors.request.use(config => {
    // for intercept request or header request
    // const cookie = new Cookie()
    // const token = cookie.get(AUTHENTICATION.TOKEN_NAME)

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    return config
  }, error => {
    return Promise.reject(error)
  })

  instance.interceptors.response.use(response => {
    return Promise.resolve(response)
  }, error => {
    return handler(error)
  })

  return instance
}

export default createResource()
