import * as MOVIETYPES from '~/store-namespace/movie/types'
import VuexModule from '~/utils/vuex'

const movieModule = VuexModule(MOVIETYPES.MODULE_NAME)

export default {
  computed: {
    ...movieModule.mapState({
      activeGenre: state => state.activeGenre,
      detailMovie: state => state.detail
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
    }
  }
}
