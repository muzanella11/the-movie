<template>
  <v-dialog
    :value="dialogYoutube"
    width="100%"
    persistent
  >
    <template #activator="{ on, attrs }">
      <v-btn
        color="red lighten-2"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Click Me
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h5">
        {{ movie.original_title || movie.name }}
      </v-card-title>

      <v-card-text>
        <youtube
          v-show="videoId"
          width="100%"
          height="500px"
          :video-id="videoId"
          :player-vars="playerVars"
        ></youtube>

        <template v-if="noTrailers && !videoId">
          No Trailers :(
        </template>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="actionClose"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mapState
} from 'vuex'
import MovieTrailer from 'movie-trailer'
import GetYoutubeID from 'get-youtube-id'

import MixinsVideo from '~/mixins/mixin-video'
import MixinsMovie from '~/mixins/mixin-movie'

export default {
  mixins: [
    MixinsVideo,
    MixinsMovie
  ],

  data () {
    return {
      videoId: '',
      playerVars: {
        autoplay: 1
      },
      noTrailers: false
    }
  },

  computed: {
    ...mapState({
      dialogYoutube: state => state.dialogShown.youtube
    })
  },

  watch: {
    dialogYoutube: {
      deep: true,
      handler (val) {
        if (val) {
          this.init()
        }
      }
    }
  },

  methods: {
    init () {
      this.prepareTrailer()
    },

    prepareTrailer () {
      const titleMovie = this.movie?.original_title || this.movie?.name

      MovieTrailer(titleMovie)
        .then(res => {
          if (res === null) {
            this.noTrailers = true
            this.videoId = ''

            return
          }

          this.videoId = GetYoutubeID(res)
        })
        .catch(err => {
          this.noTrailers = true
          console.error(err)
        })
    },

    actionClose () {
      this.videoId = ''
      this.closeDialogYt()
    }
  }
}
</script>
