<template>
  <section
    v-if="genreId"
    class="white--text"
  >
    <h2 class="font-weight-medium mb-3 mt-4 pa-5">{{ titleSection }}</h2>
    <v-slide-group
      v-model="slideActive"
      active-class="success"
      show-arrows
      dark
      width="100%"
    >
      <v-slide-item
        v-for="(itemMovie, indexMovie) in movieEntries"
        :key="indexMovie"
        v-slot="{ active, toggle }"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            :elevation="hover ? 12 : 0"
            :color="active ? undefined : 'grey lighten-1'"
            class="mr-3"
            :class="{ 'on-hover': hover }"
            height="100%"
            width="150"
            @click="toggle"
          >
            <v-img
              :src="baseUrl + itemMovie.poster_path"
              aspect-ratio="1"
              class=""
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              @click="actionGetInfo(`dynamic-genre-${titleSection}`, itemMovie)"
            >
              <template #placeholder>
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
      </v-slide-item>
    </v-slide-group>

    <home-movie-info
      v-if="activeGenre === `dynamic-genre-${titleSection}`"
    />
  </section>
</template>

<script>
import Qs from 'query-string'
import * as DISCOVERTYPES from '~/store-namespace/discover/types'
import MixinsMovie from '~/mixins/mixin-movie'
import VuexModule from '~/utils/vuex'

const discoverModule = VuexModule(DISCOVERTYPES.MODULE_NAME)

export default {
  mixins: [
    MixinsMovie
  ],

  props: {
    genreId: {
      type: [
        Number,
        null
      ],
      default: null
    },
    titleSection: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      slideActive: null,
      baseUrl: '/cdn/original',
      entries: []
    }
  },

  computed: {
    movieEntries () {
      let result = this.sortBy(this.entries, 'popularity')

      result = this.sortByDate(result, 'release_date')
      result = this.sortBy(result, 'vote_count')

      return result
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    ...discoverModule.mapActions({
      fetchMovie: DISCOVERTYPES.FETCH_MOVIE
    }),

    init () {
      if (!this.genreId) return

      this.fetchResource()
    },

    fetchResource () {
      const payload = Object.assign({}, {
        api_key: process.env.THE_MOVIE_DB_APP_KEY || '',
        with_genres: this.genreId
      })

      this.fetchMovie(Qs.stringify(payload))
        .then(response => {
          const { results } = response.data

          this.entries = results
        })
        .catch(err => {
          this.entries = []
          console.info('err :: ', err)
        })
    },

    sortBy (rawArray, objName) {
      return rawArray.slice(0).sort((a, b) => {
        return (a[objName] > b[objName]) ? 1 : (a[objName] < b[objName]) ? -1 : 0
      })
    },

    sortByDate (rawArray, objNameDate) {
      return rawArray.sort((a, b) => {
        return new Date(a[objNameDate]) - new Date(b[objNameDate])
      })
    },

    actionGetInfo (activeGenre, item) {
      this.actionMovieInfo(activeGenre, item)
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
