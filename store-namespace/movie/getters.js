import * as TYPES from './types'
import {
  getStorage
} from '~/utils/storage'

export default {
  [TYPES.GET_FAVORITE] (state) {
    if (getStorage(TYPES.STORAGE_NAME) === undefined) return []

    let rawData = getStorage(TYPES.STORAGE_NAME)

    rawData = rawData.split(',')

    return rawData
  }
}
