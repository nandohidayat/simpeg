<template>
  <div>
    <v-snackbar
      v-for="(err, i) in notification.errors"
      :key="i"
      v-model="snackbar"
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
  data: () => ({
    snackbar: true
  }),
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
