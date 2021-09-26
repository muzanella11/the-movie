import * as ROOTTYPES from './../root/types'
import * as TYPES from './types'
import api from '~/api'

export default {
  [TYPES.FETCH_TV] ({ commit }, payload) {
    commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.list', value: true }, { root: true })

    return new Promise((resolve, reject) => {
      api.discover.getTvDiscover(payload)
        .then(response => {
          const { results } = response.data

          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.list', value: false }, { root: true })
          commit(TYPES.SET_STATE, { accessor: 'entriesTv', value: results })
          resolve(response)
        })
        .catch(error => {
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.list', value: false }, { root: true })
          commit(TYPES.SET_STATE, { accessor: 'entriesTv', value: [] })
          reject(error)
        })
    })
  },

  [TYPES.FETCH_MOVIE] ({ commit }, payload) {
    commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.list', value: true }, { root: true })

    return new Promise((resolve, reject) => {
      api.discover.getMovieDiscover(payload)
        .then(response => {
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.list', value: false }, { root: true })
          resolve(response)
        })
        .catch(error => {
          commit(ROOTTYPES.SET_STATE, { accessor: 'isLoading.list', value: false }, { root: true })
          reject(error)
        })
    })
  }
}
