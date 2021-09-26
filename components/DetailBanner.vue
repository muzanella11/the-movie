<template>
  <div
    v-if="bannerTitle"
    class="ma-0"
  >
    <header class="c-banner" :style="headerStyle">
      <div class="banner__contents">
        <h1 class="banner__title">
          {{ bannerTitle }}
        </h1>
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
          {{ formattedDate(movieBanner.release_date) }} |
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
import moment from 'moment'
import * as MOVIETYPES from '~/store-namespace/movie/types'
import MixinsVideo from '~/mixins/mixin-video'
import MixinsMovie from '~/mixins/mixin-movie'
import VuexModule from '~/utils/vuex'

const movieModule = VuexModule(MOVIETYPES.MODULE_NAME)

export default {
  mixins: [
    MixinsVideo,
    MixinsMovie
  ],

  data () {
    return {
      size: 'cover',
      position: 'center center',
      image: ''
    }
  },

  computed: {
    ...movieModule.mapState({
      movieBanner: state => state.detail
    }),

    truncateOverview () {
      const n = 150;
      const movieOverview = this.movieBanner?.overview;
      return movieOverview?.length > n
        ? movieOverview.substr(0, n - 1) + "..."
        : movieOverview;
    },

    bannerTitle () {
      return this.movieBanner?.title || this.movieBanner?.name || this.movieBanner?.original_title;
    },

    headerStyle () {
      console.info('sssss :: ', this.movieBanner)
      return {
        backgroundSize: this.size,
        backgroundPosition: this.position,
        backgroundImage: `url("/cdn/original/${this.movieBanner?.backdrop_path}")`,
      }
    }
  },

  mounted () {
    //
  },

  methods: {
    formattedDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  }
}
</script>
