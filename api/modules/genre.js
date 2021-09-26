import axios from 'axios'
import endpoint from '../endpoint'
import resource from '../resource'

const AxiosCancelToken = axios.CancelToken
const NAMESPACE = 'GENRE'

export default {
  getGenreMovieList (payload) {
    let cancel
    const CANCEL_TOKEN = `${NAMESPACE}_GET_GENRE_MOVIE_LIST`
    const request = resource.get(`${endpoint.genre.getGenreMovieList}?${payload}`, {
      cancelToken: new AxiosCancelToken(cancelRequest => {
        cancel = cancelRequest
      })
    })

    window[CANCEL_TOKEN] = cancel

    return request
  }
}
