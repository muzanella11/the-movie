import axios from 'axios'
import endpoint from '../endpoint'
import resource from '../resource'

const AxiosCancelToken = axios.CancelToken
const NAMESPACE = 'GENRE'

export default {
  getMovieList () {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_GET_MOVIE_LIST`
    const request = resource.get(`${endpoint.genre.getMovieList}`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  }
}
