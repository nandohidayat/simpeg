<template>
  <div class="d-inline-block">
    <div :style="{ position: 'sticky', top: 0, zIndex: 9 }" class="elevation-4">
      <v-btn height="35" width="120" depressed small tile color="white">
        Total Jam
      </v-btn>
      <v-divider></v-divider>
    </div>
    <div v-for="(o, i) in schedule.order" :key="i">
      <v-btn
        :ripple="false"
        height="35"
        width="120"
        depressed
        small
        tile
        color="white"
      >
        {{ schedule.jam[o] }}
      </v-btn>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['schedule']),
  },
}
</script>
