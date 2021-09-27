import * as MOVIETYPES from '~/store-namespace/movie/types'
import {
  setStorage
} from '~/utils/storage'
import VuexModule from '~/utils/vuex'

const movieModule = VuexModule(MOVIETYPES.MODULE_NAME)

const STORAGE_NAME = 'TM_FAVORITE'

export default {
  data () {
    return {
      //
    }
  },

  computed: {
    ...movieModule.mapState({
      entriesFavorite: state => state.favorite
    }),

    ...movieModule.mapGetters({
      rawFavorite: MOVIETYPES.GET_FAVORITE
    })
  },

  mounted () {
    this.init()
  },

  methods: {
    ...movieModule.mapMutations({
      movieSetState: MOVIETYPES.SET_STATE
    }),

    init () {
      this.movieSetState({
        accessor: 'favorite',
        value: this.rawFavorite
      })
    },

    favorite (id) {
      if (!id) return
      if (this.checkHasFavorite(id)) return

      const favorite = JSON.parse(JSON.stringify(this.entriesFavorite))

      favorite.push(id.toString())
      this.movieSetState({
        accessor: 'favorite',
        value: favorite
      })

      const resultStorage = favorite.join(',')

      setStorage(STORAGE_NAME, resultStorage)
    },

    unfavorite (id) {
      if (!id) return
      if (!this.checkHasFavorite(id)) return

      const favorite = JSON.parse(JSON.stringify(this.entriesFavorite))
      const getIndexFavorite = favorite.indexOf(id.toString())

      favorite.splice(getIndexFavorite, 1)
      this.movieSetState({
        accessor: 'favorite',
        value: favorite
      })

      const resultStorage = favorite.join(',')

      setStorage(STORAGE_NAME, resultStorage)
    },

    actionFavorite (id) {
      if (this.checkHasFavorite(id)) {
        this.unfavorite(id)

        return
      }

      this.favorite(id)
    },

    checkHasFavorite (id) {
      if (!id) return
      if (!this.entriesFavorite) return

      return this.entriesFavorite.includes(id.toString())
    }
  }
}
