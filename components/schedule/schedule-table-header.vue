<template>
  <div :style="{ position: 'sticky', top: 0, zIndex: 11 }" class="elevation-4">
    <div
      :style="{
        zIndex: 10,
        position: 'sticky',
        backgroundColor: 'white',
        left: 0,
      }"
      class="d-inline-block"
    >
      <v-btn height="35" width="200" depressed small tile color="white">
        Nama
      </v-btn>
    </div>
    <div class="d-inline-block">
      <v-btn
        v-for="d in schedule.day"
        :key="d"
        :color="dayColor(d)"
        height="35px"
        width="35px"
        tile
        depressed
        small
        >{{ d }}</v-btn
      >
    </div>
    <div class="d-inline-block">
      <v-btn height="35" width="120" depressed small tile color="white">
        Total Jam
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['schedule']),
    ...mapGetters('schedule', ['dayColor']),
  },
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

.v-btn {
  border-right: 1px solid map-get($grey, lighten-2) !important;
}
</style>
