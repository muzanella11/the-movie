import * as ROOTTYPES from './../root/types'
import * as TYPES from './types'
import api from '~/api'

export default {
  [TYPES.FETCH_MOVIE_LIST] ({ commit }, payload) {
    commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: true }, { root: true })

    return new Promise((resolve, reject) => {
      api.genre.getGenreMovieList(payload)
        .then(response => {
          const { genres } = response.data

          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: false }, { root: true })
          commit(TYPES.SET_STATE, { accessor: 'entries', value: genres })
          resolve(response)
        })
        .catch(error => {
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: false }, { root: true })
          commit(TYPES.SET_STATE, { accessor: 'entries', value: [] })
          reject(error)
        })
    })
  }
}
