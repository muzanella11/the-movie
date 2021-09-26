import {
  mapState,
  mapMutations
} from 'vuex'
import * as ROOTTYPES from '~/store-namespace/root/types'

export default {
  data () {
    return {
      //
    }
  },

  computed: {
    ...mapState({
      dialogYtShown: state => state.dialogShown.youtube
    })
  },

  methods: {
    ...mapMutations({
      setRootState: ROOTTYPES.SET_STATE
    }),

    actionPlay () {
      this.actionToggleDialogYt()
    },

    actionToggleDialogYt () {
      this.setRootState({
        accessor: 'dialogShown.youtube',
        value: !this.dialogYtShown
      })
    },

    openDialogYt () {
      this.setRootState({
        accessor: 'dialogShown.youtube',
        value: true
      })
    },

    closeDialogYt () {
      this.setRootState({
        accessor: 'dialogShown.youtube',
        value: false
      })
    }
  }
}
