<template>
  <v-main class="grey lighten-4 pb-7">
    <v-app-bar
      app
      color="white"
      style="z-index: 999; padding: 0;"
      tile
      dense
      class="main-layout px-5"
    >
    </v-app-bar>

    <v-container fluid class="px-10 pb-5"> </v-container>
  </v-main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user']),
  },
  head() {
    return {
      title: 'Dashboard',
    }
  },
}
</script>
