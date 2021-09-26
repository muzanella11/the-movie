import * as ROOTTYPES from './../root/types'
import * as TYPES from './types'
import api from '~/api'

export default {
  [TYPES.FETCH_DETAIL] ({ commit }, payload) {
    commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: true }, { root: true })

    const {
      id,
      queryString
    } = payload

    return new Promise((resolve, reject) => {
      api.movie.getDetail(id, queryString)
        .then(response => {
          let result = response.data

          result = Object.assign(result, {
            genres: result.genres.map(item => item.id)
          })

          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: false }, { root: true })
          commit(TYPES.SET_STATE, { accessor: 'detail', value: result })
          resolve(response)
        })
        .catch(error => {
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: false }, { root: true })
          commit(TYPES.SET_STATE, { accessor: 'detail', value: {} })
          reject(error)
        })
    })
  },

  [TYPES.FETCH_IMAGES] ({ commit }, payload) {
    commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: true }, { root: true })

    const {
      id,
      queryString
    } = payload

    return new Promise((resolve, reject) => {
      api.movie.getImages(id, queryString)
        .then(response => {
          const result = response.data.backdrops || []

          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: false }, { root: true })
          commit(TYPES.SET_STATE, { accessor: 'detailImages', value: result })
          resolve(response)
        })
        .catch(error => {
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.form', value: false }, { root: true })
          commit(TYPES.SET_STATE, { accessor: 'detailImages', value: [] })
          reject(error)
        })
    })
  }
}
