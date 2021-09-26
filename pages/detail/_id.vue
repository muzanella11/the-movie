<template>
  <div class="l-detail">
    <detail-banner />

    <v-container fluid>
      <section class="white--text">
        <h2 class="font-weight-medium mb-3 mt-4 pa-5">
          Duration
        </h2>

        <v-row class="pr-5 pl-5">
          <v-col>
            {{ converTime(movieDetail.runtime) }}
          </v-col>
        </v-row>
      </section>

      <section class="white--text">
        <h2 class="font-weight-medium mb-3 mt-4 pa-5">
          Genre
        </h2>

        <v-row class="pr-5 pl-5">
          <v-col>
            <v-chip
              v-for="(itemGenre, indexGenre) in listGenre"
              :key="indexGenre"
              class="mr-2"
              color="amber"
              label
              outlined
            >
              {{ itemGenre }}
            </v-chip>
          </v-col>
        </v-row>
      </section>

      <section
        v-if="movieDetail.spoken_languages"
        class="white--text"
      >
        <h2 class="font-weight-medium mb-3 mt-4 pa-5">
          Language
        </h2>

        <v-row class="pr-5 pl-5">
          <v-col>
            <v-chip
              v-for="(itemLang, indexLang) in movieDetail.spoken_languages"
              :key="indexLang"
              class="mr-2"
              color="amber"
              label
              outlined
            >
              {{ itemLang.english_name }}
            </v-chip>
          </v-col>
        </v-row>
      </section>

      <section class="white--text">
        <h2 class="font-weight-medium mb-3 mt-4 pa-5">
          Vote Count
        </h2>

        <v-row class="pr-5 pl-5">
          <v-col>
            {{ movieDetail.vote_count }}
          </v-col>
        </v-row>
      </section>

      <section class="white--text">
        <h2 class="font-weight-medium mb-3 mt-4 pa-5">
          Vote Average
        </h2>

        <v-row class="pr-5 pl-5">
          <v-col>
            {{ movieDetail.vote_average }}
          </v-col>
        </v-row>
      </section>

      <section class="white--text">
        <h2 class="font-weight-medium mb-3 mt-4 pa-5">
          Revenue
        </h2>

        <v-row class="pr-5 pl-5">
          <v-col>
            {{ formattedCurrency(movieDetail.revenue) }}
          </v-col>
        </v-row>
      </section>

      <section class="white--text">
        <h2 class="font-weight-medium mb-3 mt-4 pa-5">
          Production Companies
        </h2>

        <v-row class="pr-5 pl-5">
          <v-col>
            <v-row>
              <v-col
                v-for="(itemPcomp, indexPcomp) in movieDetail.production_companies"
                :key="indexPcomp"
                cols="3"
                lg="3"
                sm="3"
                xs="3"
              >
                <v-hover v-slot="{ hover }">
                  <v-card
                    :elevation="hover ? 12 : 0"
                    :color="active ? undefined : 'grey lighten-1'"
                    :class="{ 'on-hover': hover }"
                  >
                    <v-img
                      :src="baseUrl + itemPcomp.logo_path"
                      aspect-ratio="1"
                      class=""
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      height="200px"
                    >
                      <template
                        v-if="itemPcomp.logo_path"
                        #placeholder
                      >
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>

                    <v-card-title class="black--text">
                      {{ itemPcomp.name }}
                    </v-card-title>

                    <v-card-text class="black--text">
                      {{ itemPcomp.origin_country }}
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
import Qs from 'query-string'
import * as GENRETYPES from '~/store-namespace/genre/types'
import * as MOVIETYPES from '~/store-namespace/movie/types'
import VuexModule from '~/utils/vuex'

import MixinsMovie from '~/mixins/mixin-movie'

const genreModule = VuexModule(GENRETYPES.MODULE_NAME)
const movieModule = VuexModule(MOVIETYPES.MODULE_NAME)

export default {
  mixins: [
    MixinsMovie
  ],

  data () {
    return {
      baseUrl: '/cdn/original'
    }
  },

  computed: {
    ...genreModule.mapState({
      genreEntries: state => state.entries
    }),

    ...movieModule.mapState({
      movieDetail: state => state.detail
    }),

    movieId () {
      return this.$route.params.id.split('-')[0]
    },

    listGenre () {
      if (!this.showGenre(this.movieDetail.genres)) return []

      return this.showGenre(this.movieDetail.genres).split(', ')
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    ...genreModule.mapActions({
      fetchMovieList: GENRETYPES.FETCH_MOVIE_LIST
    }),

    ...movieModule.mapActions({
      fetchMovieDetail: MOVIETYPES.FETCH_DETAIL
    }),

    init () {
      this.fetchEntriesMovie()
      this.fetchDetail()
    },

    fetchDetail () {
      const rawQuery = Object.assign({}, {
        api_key: process.env.THE_MOVIE_DB_APP_KEY || '',
        language: process.env.THE_MOVIE_LANG || ''
      })

      const payload = Object.assign({}, {
        id: this.movieId,
        queryString: Qs.stringify(rawQuery)
      })

      this.fetchMovieDetail(payload)
        .then(response => {
          console.info('ress :: ', response)
        })
        .catch(err => {
          console.info('err :: ', err)
        })
    },

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

<style scoped>
.v-img {
  object-fit: contain;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}
.v-card:not(.on-hover) {
  opacity: 0.8;
}
</style>
