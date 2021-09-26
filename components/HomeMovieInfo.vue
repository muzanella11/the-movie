<template>
  <v-container
    v-if="bannerTitle"
    class="mt-1"
  >
    <v-card>
      <header class="c-banner" :style="headerStyle">
        <div class="banner__contents">
          <h1 class="banner__title">
            <a :href="generateUrlDetail(movie)" class="white--text">
              {{ bannerTitle }}
            </a>
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
            {{ showGenre(movie.genre_ids) }} |
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-star</v-icon> {{ showPopularity(movie.popularity) }}
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
    </v-card>
  </v-container>
</template>

<script>
import MixinsMovie from '~/mixins/mixin-movie'
import MixinsVideo from '~/mixins/mixin-video'

export default {
  mixins: [
    MixinsMovie,
    MixinsVideo
  ],

  data () {
    return {
      size: 'cover',
      position: 'center center',
    }
  },

  computed: {
    truncateOverview () {
      const n = 150;
      const movieOverview = this.movie?.overview;
      return movieOverview?.length > n
        ? movieOverview.substr(0, n - 1) + "..."
        : movieOverview;
    },

    bannerTitle () {
      return this.movie?.title || this.movie?.name || this.movie?.original_name;
    },

    headerStyle () {
      return {
        backgroundSize: this.size,
        backgroundPosition: this.position,
        backgroundImage: `url("/cdn/original${this.movie?.backdrop_path}")`,
      }
    }
  }
}
</script>
