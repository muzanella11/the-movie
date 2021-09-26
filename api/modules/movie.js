import axios from 'axios'
import endpoint from '../endpoint'
import resource from '../resource'

const AxiosCancelToken = axios.CancelToken
const NAMESPACE = 'MOVIE'

export default {
  getDetail (id, payload) {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_GET_DETAIL`
    const request = resource.get(`${endpoint.movie.index}/${id}?${payload}`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  },

  getImages (id, payload) {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_GET_IMAGES`
    const request = resource.get(`${endpoint.movie.index}/${id}/images?${payload}`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  }
}
