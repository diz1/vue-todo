<template>
  <div class="text-center">

    <v-snackbar
        v-model="snackbar.visible"
        top
        left
        :multi-line="multiLine"
        :timeout="0"
    >
      {{ snackbar.message }}
      <v-btn
          color="red"
          text
          @click="close"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SnackBar',
  props: {
    message: {
      type: String,
      required: true
    }
  },
  data: () => ({
    multiLine: true
  }),
  computed: {
    ...mapGetters(['snackbar'])
  },
  methods: {
    close () {
      this.$store.commit('SET_SNACKBAR', { visible: false, message: '' })
    }
  }
}
</script>
