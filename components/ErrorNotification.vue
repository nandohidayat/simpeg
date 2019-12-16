<template>
  <div>
    <v-snackbar
      v-for="(err, i) in notification.errors"
      :key="i"
      v-model="snackbar"
      color="error"
    >
      {{ err }}
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
  }
}
</script>

<style scoped></style>
