<template>
  <v-main class="grey lighten-4 pb-7">
    <v-app-bar
      app
      color="white"
      style="z-index: 999; padding: 0"
      tile
      dense
      class="main-layout px-5"
    >
    </v-app-bar>

    <v-container fluid class="px-10 pb-5" fill-height>
      <v-row no-gutters align="center" justify="center">
        <v-col class="text-center"
          ><img
            :src="`${baseUrl}/roemani-long.png`"
            alt="ROEMANI"
            style="opacity: 0.1"
        /></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user']),
    baseUrl() {
      return process.env.baseUrl
    },
  },
  head() {
    return {
      title: 'Dashboard',
    }
  },
}
</script>
