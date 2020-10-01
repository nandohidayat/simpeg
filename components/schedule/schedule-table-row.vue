<template>
  <div class="row-parent">
    <div
      :style="{
        zIndex: 9,
        position: 'sticky',
        left: 0,
      }"
      class="d-inline-block"
    >
      <button-name
        v-if="isNaN(idxData)"
        :idx-order="idxOrder"
        :order="order"
      ></button-name>
      <button-name
        v-else
        :idx-order="idxOrder"
        :value="schedule.nama[idxData]"
        :order="order"
        @click.native="(e) => nameClick(e, idxData)"
        @mouseenter.native="hover = idxData"
        @mouseleave.native="hover = undefined"
      ></button-name>
    </div>
    <div class="d-inline-block">
      <div v-if="isNaN(idxData)">
        <v-btn
          v-for="d in schedule.day"
          :key="d"
          height="35px"
          width="35px"
          color="white"
          tile
          depressed
          small
        ></v-btn>
      </div>
      <div v-else>
        <button-day
          v-for="(s, j) in schedule.shift[idxData]"
          :key="j"
          :shift="s"
          :active="active(j, idxData)"
          @click.native="(e) => ranged(e, j, idxData)"
        ></button-day>
      </div>
    </div>
    <div class="d-inline-block">
      <v-btn
        :ripple="false"
        height="35"
        width="120"
        depressed
        small
        tile
        color="white"
      >
        {{ schedule.jam[idxData] }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import ButtonName from '@/components/schedule/schedule-button-name'
import ButtonDay from '@/components/schedule/schedule-button-day'

export default {
  components: {
    ButtonName,
    ButtonDay,
  },
  props: {
    idxOrder: {
      type: Number,
      default: undefined,
    },
    idxData: {
      type: Number || String,
      default: undefined,
    },
    order: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['schedule']),
    ...mapGetters('schedule', ['dayColor', 'active']),
    ...mapGetters('user', ['hadOption']),
  },
  methods: {
    nameClick(event, staff) {
      if (!this.hadOption(5) || this.order) return
      if (this.schedule.selectedStaff === staff) {
        this.$store.commit('schedule/updateSelected', {
          day: [],
          staff: undefined,
        })
      } else {
        this.$store.commit('schedule/updateSelected', {
          day: [0, this.schedule.day - 1],
          staff,
        })
      }
      this.$emit('menu', event)
    },
    ranged(event, day, staff) {
      if (!this.hadOption(5) || this.order) return
      if (
        this.schedule.selectedDay.length === 0 ||
        this.schedule.selectedDay.length === 2 ||
        this.schedule.selectedStaff !== staff
      ) {
        this.$store.commit('schedule/updateSelected', { day: [day], staff })
      } else if (this.schedule.selectedDay[0] < day) {
        this.$store.commit('schedule/updateSelected', {
          day: [...this.schedule.selectedDay, day],
          staff,
        })
      } else if (this.schedule.selectedDay[0] > day) {
        this.$store.commit('schedule/updateSelected', {
          day: [day, ...this.schedule.selectedDay],
          staff,
        })
      } else {
        this.$store.commit('schedule/updateSelected', {
          day: [],
          staff: undefined,
        })
      }
      this.$emit('menu', event)
    },
  },
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

.row-parent .v-btn {
  border-right: 1px solid map-get($grey, lighten-2) !important;
  border-bottom: 1px solid map-get($grey, lighten-2) !important;
}

.row-parent:hover .v-btn {
  background-color: map-get($red, lighten-5) !important;
}

.row-parent:hover .v-btn.active {
  background-color: map-get($grey, lighten-2) !important;
}
</style>
