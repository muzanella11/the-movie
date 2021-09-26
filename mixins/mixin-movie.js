import currency from 'currency.js'
import * as MOVIETYPES from '~/store-namespace/movie/types'
import * as GENRETYPES from '~/store-namespace/genre/types'
import VuexModule from '~/utils/vuex'

const movieModule = VuexModule(MOVIETYPES.MODULE_NAME)
const genreModule = VuexModule(GENRETYPES.MODULE_NAME)

export default {
  computed: {
    ...movieModule.mapState({
      activeGenre: state => state.activeGenre,
      detailMovie: state => state.detail
    }),

    ...genreModule.mapState({
      entriesGenre: state => state.entries
    }),

    movie () {
      return this.detailMovie || {}
    }
  },

  methods: {
    ...movieModule.mapMutations({
      movieSetState: MOVIETYPES.SET_STATE
    }),

    actionMovieInfo (activeGenre, movieItem) {
      this.movieSetState({
        accessor: 'activeGenre',
        value: activeGenre
      })

      this.movieSetState({
        accessor: 'detail',
        value: movieItem
      })
    },

    getGenre (id) {
      if (!id) return

      return this.entriesGenre.filter(item => item.id === id)[0]?.name
    },

    showGenre (entries) {
      if (!entries) return

      const result = entries.map(item => {
        return this.getGenre(item) ? this.getGenre(item) : item
      })

      return result.join(', ')
    },

    showPopularity (value) {
      return Math.round(value)
    },

    generateUrlDetail (item) {
      const {
        id
      } = item

      return `/detail/${id}-enmovie`
    },

    formattedCurrency (value) {
      return currency(value).format()
    },

    converTime (value) {
      const hours = (value / 60)
      const roundHours = Math.floor(hours)

      const minutes = (hours - roundHours) * 60
      const roundMinutes = Math.round(minutes)

      let result = ''

      if (roundHours > 0) {
        result = `${roundHours} hours`
      }

      if (roundMinutes) {
        result = result + `${roundHours > 0 ? ' ' : ''}${roundMinutes} minutes`
      }

      return result
    }
  }
}
