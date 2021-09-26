<template>
  <section class="white--text">
    <h2 class="font-weight-medium mb-3 mt-4 pa-5">TV SERIALS</h2>
    <v-slide-group
      v-model="slideActive"
      active-class="success"
      show-arrows
      dark
      width="100%"
    >
      <v-slide-item
        v-for="(itemMovie, indexMovie) in discoverEntries"
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
            width="110"
            @click="toggle"
          >
            <v-img
              :src="baseUrl + itemMovie.poster_path"
              aspect-ratio="1"
              class=""
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              @click="actionGetInfo('tv-serials', itemMovie)"
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
      v-if="activeGenre === 'tv-serials'"
    />
  </section>
</template>

<script>
import * as DISCOVERTYPES from '~/store-namespace/discover/types'
import MixinsMovie from '~/mixins/mixin-movie'
import VuexModule from '~/utils/vuex'

const discoverModule = VuexModule(DISCOVERTYPES.MODULE_NAME)

export default {
  mixins: [
    MixinsMovie
  ],

  data () {
    return {
      slideActive: null,
      baseUrl: '/cdn/original',
    }
  },

  computed: {
    ...discoverModule.mapState({
      discoverEntries: state => state.entriesTv
    })
  },

  methods: {
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
