<template>
  <div class="l-favorite mt-16">
    <section class="white--text">
      <h2 class="font-weight-medium mb-3 mt-4 pa-5">Favorite</h2>

      <v-row class="pr-5 pl-5">
        <v-col
          v-for="(itemFavorite, indexFavorite) in entries"
          :key="indexFavorite"
          cols="3"
          lg="3"
          sm="3"
          xs="3"
        >
          <v-hover v-slot="{ hover, active }">
            <v-card
              :elevation="hover ? 12 : 0"
              :color="active ? undefined : 'grey lighten-1'"
              :class="{ 'on-hover': hover }"
              @click="actionToggleDetail(itemFavorite.id)"
            >
              <v-img
                :src="baseUrl + itemFavorite.backdrop_path"
                aspect-ratio="1"
                class=""
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <template
                  v-if="itemFavorite.backdrop_path"
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
            </v-card>
          </v-hover>
        </v-col>

        <v-col
          v-if="detailShown"
          cols="12"
          lg="12"
          sm="12"
          xs="12"
        >
          <detail-banner />
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
import Qs from 'query-string'
import * as MOVIETYPES from '~/store-namespace/movie/types'
import VuexModule from '~/utils/vuex'

import MixinsFavorite from '~/mixins/mixin-favorite'
import MixinsMovie from '~/mixins/mixin-movie'

const movieModule = VuexModule(MOVIETYPES.MODULE_NAME)

export default {
  mixins: [
    MixinsFavorite,
    MixinsMovie
  ],

  data () {
    return {
      baseUrl: '/cdn/original',
      entries: [],
      detailShown: false
    }
  },

  computed: {
    ...movieModule.mapState({
      movieDetail: state => state.detail
    })
  },

  mounted () {
    this.init()
  },

  methods: {
    ...movieModule.mapActions({
      fetchMovieDetail: MOVIETYPES.FETCH_DETAIL
    }),

    init () {
      this.fetchResource()
    },

    actionToggleDetail (id) {
      this.detailShown = !this.detailShown

      if (this.detailShown && this.movieDetail.id !== parseInt(id)) {
        this.fetchDetail(id, false)
      }
    },

    fetchResource () {
      this.entriesFavorite.forEach(itemFavorite => {
        if (!itemFavorite) return

        this.fetchDetail(itemFavorite, true)
      })
    },

    fetchDetail (movieId, withUpdateEntries) {
      const rawQuery = Object.assign({}, {
        api_key: process.env.THE_MOVIE_DB_APP_KEY || '',
        language: process.env.THE_MOVIE_LANG || ''
      })

      const payload = Object.assign({}, {
        id: movieId,
        queryString: Qs.stringify(rawQuery)
      })

      this.fetchMovieDetail(payload)
        .then(response => {
          const result = response.data

          if (withUpdateEntries) {
            this.entries.push(result)
          }

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
  cursor: pointer;
}
.v-card:not(.on-hover) {
  opacity: 0.8;
}
</style>
