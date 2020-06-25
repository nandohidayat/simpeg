<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      {{ user }}
    </v-flex>
  </v-layout>
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
