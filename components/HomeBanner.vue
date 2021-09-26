<template>
  <div
    v-if="bannerTitle"
    class="ma-0"
  >
    <header class="c-banner" :style="headerStyle">
      <div class="banner__contents">
        <h1 class="banner__title">{{ bannerTitle }}</h1>
        <div class="banner__buttons">
          <button
            class="banner__button rounded-0"
            @click="openDialogYt"
          >Play</button>
          <button class="banner__button rounded-0">
            <v-icon class="mr-2">
              mdi-heart-outline
            </v-icon>

            Favorite
          </button>
        </div>
        <p class="banner__description">
          {{ showGenre(movieBanner.genre_ids) }} |
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-star</v-icon> {{ showPopularity(movieBanner.popularity) }}
              </span>
            </template>
            <span>Popularity</span>
          </v-tooltip>
          <br />

          {{ truncateOverview }}
        </p>
      </div>
      <div class="banner__fadeBottom" />
    </header>
  </div>
</template>

<script>
import Qs from 'query-string'
import * as DISCOVERTYPES from '~/store-namespace/discover/types'
import MixinsVideo from '~/mixins/mixin-video'
import MixinsMovie from '~/mixins/mixin-movie'
import VuexModule from '~/utils/vuex'

const discoverModule = VuexModule(DISCOVERTYPES.MODULE_NAME)

export default {
  mixins: [
    MixinsVideo,
    MixinsMovie
  ],

  data () {
    return {
      movieBanner: {},
      size: 'cover',
      position: 'center center',
      image: ''
    }
  },

  computed: {
    ...discoverModule.mapState({
      discoverEntries: state => state.entriesTv
    }),

    truncateOverview () {
      const n = 150;
      const movieOverview = this.movieBanner?.overview;
      return movieOverview?.length > n
        ? movieOverview.substr(0, n - 1) + "..."
        : movieOverview;
    },

    bannerTitle () {
      return this.movieBanner?.title || this.movieBanner?.name || this.movieBanner?.original_name;
    },

    headerStyle () {
      return {
        backgroundSize: this.size,
        backgroundPosition: this.position,
        backgroundImage: `url("/cdn/original${this.image}")`,
      }
    }
  },

  mounted () {
    this.fetchEntriesTV()
  },

  methods: {
    ...discoverModule.mapActions({
      fetchTv: DISCOVERTYPES.FETCH_TV
    }),

    fetchEntriesTV () {
      const payload = Object.assign({}, {
        api_key: process.env.THE_MOVIE_DB_APP_KEY || '',
        with_networks: 213
      })

      this.fetchTv(Qs.stringify(payload))
        .then(response => {
          const { results } = response.data
          const movieIndex = Math.floor(Math.random() * (results.length - 1))

          this.movieBanner = results[movieIndex]
          this.image = results[movieIndex]?.backdrop_path

          this.movieSetState({
            accessor: 'detail',
            value: this.movieBanner
          })
        })
        .catch(err => {
          console.info('err :: ', err)
        })
    }
  }
}
</script>
