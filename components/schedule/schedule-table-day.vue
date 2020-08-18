<template>
  <div class="d-inline-block">
    <div :style="{ position: 'sticky', top: 0, zIndex: 9 }" class="elevation-4">
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
      <v-divider></v-divider>
    </div>
    <div v-for="(o, i) in schedule.order" :key="i">
      <div v-if="isNaN(o)">
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
        <schedule-button
          v-for="(s, j) in schedule.shift[o]"
          :key="j"
          :shift="s"
          :active="active(j, o)"
          :class-name="{ 'n-btn': true }"
          @click.native="(e) => ranged(e, j, o)"
        ></schedule-button>
      </div>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import ScheduleButton from '@/components/schedule/schedule-button'

export default {
  components: {
    ScheduleButton,
  },
  props: {
    staff: {
      type: String,
      default: undefined,
    },
    day: {
      type: Array,
      default: undefined,
    },
  },
  computed: {
    ...mapState(['schedule']),
    ...mapGetters('schedule', ['dayColor']),
    ...mapGetters('user', ['hadOption']),
  },
  methods: {
    active(day, staff) {
      if (
        this.staff === staff &&
        (day === this.day[0] || (day > this.day[0] && day <= this.day[1]))
      ) {
        return true
      }
      return false
    },
    ranged(event, day, staff) {
      if (!this.hadOption(5)) return
      if (
        this.day.length === 0 ||
        this.day.length === 2 ||
        this.staff !== staff
      ) {
        this.$emit('update:day', [day])
        this.$emit('update:staff', staff)
      } else if (this.day[0] < day) {
        this.$emit('update:day', [...this.day, day])
      } else if (this.day[0] > day) {
        this.$emit('update:day', [day, ...this.day])
      } else {
        this.$emit('update:day', [])
        this.$emit('update:staff', undefined)
      }
      this.$emit('menu', event)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

.v-btn {
  border-right: 1px solid map-get($grey, lighten-2) !important;
}
</style>
