import axios from 'axios'
import endpoint from '../endpoint'
import resource from '../resource'

const AxiosCancelToken = axios.CancelToken
const NAMESPACE = 'DISCOVER'

export default {
  getTvDiscover (payload) {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_GET_TV_DISCOVER`
    const request = resource.get(`${endpoint.discover.tvDiscover}?${payload}`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  },

  getMovieDiscover (payload) {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_GET_MOVIE_DISCOVER`
    const request = resource.get(`${endpoint.discover.movieDiscover}?${payload}`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  }
}
