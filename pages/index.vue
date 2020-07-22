<template>
  <v-layout> </v-layout>
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
