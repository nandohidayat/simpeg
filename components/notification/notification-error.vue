<template>
  <div>
    <v-snackbar
      v-for="(err, i) in notification.errors"
      :key="i"
      :value="notification.error_snackbar"
      color="error"
    >
      {{ err }}
      <v-btn @click="del" color="white" text>
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['notification'])
  },
  methods: {
    del() {
      this.$store.dispatch('notification/delError')
    }
  }
}
</script>

<style scoped></style>
