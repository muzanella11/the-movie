<template>
  <div class="l-landing">
    <home-banner />

    <v-container fluid>
      <home-tv-serials />

      <dynamic-movie-section
        v-for="(itemMovieSection, indexMovieSection) in genreEntries"
        :key="indexMovieSection"
        :genre-id="itemMovieSection.id"
        :title-section="itemMovieSection.name"
      />
    </v-container>
  </div>
</template>

<script>
import Qs from 'query-string'
import * as GENRETYPES from '~/store-namespace/genre/types'
import VuexModule from '~/utils/vuex'

const genreModule = VuexModule(GENRETYPES.MODULE_NAME)

export default {
  data () {
    return {
      //
    }
  },

  computed: {
    ...genreModule.mapState({
      genreEntries: state => state.entries
    })
  },

  mounted () {
    this.fetchEntriesMovie()
  },

  methods: {
    ...genreModule.mapActions({
      fetchMovieList: GENRETYPES.FETCH_MOVIE_LIST
    }),

    fetchEntriesMovie () {
      const payload = Object.assign({}, {
        api_key: process.env.THE_MOVIE_DB_APP_KEY || '',
        language: process.env.THE_MOVIE_LANG || ''
      })

      this.fetchMovieList(Qs.stringify(payload))
        .then(response => {
          console.info('ress :: ', response)
        })
        .catch(err => {
          console.info('err :: ', err)
        })
    }
  }
}
</script>
