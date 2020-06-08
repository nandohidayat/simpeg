<template>
  <v-card outlined>
    <div
      style="overflow-y: auto; overflow-x: auto; white-space: nowrap;max-height: 450px"
    >
      <div
        :style="{
          zIndex: 10,
          position: 'sticky',
          backgroundColor: 'white',
          left: 0
        }"
        class="shadow d-inline-block"
      >
        <div :style="{ position: 'sticky', top: 0, zIndex: 11 }" class="shadow">
          <v-btn height="35" width="200" depressed small tile color="white">
            Nama
          </v-btn>
          <v-divider></v-divider>
        </div>
        <div v-for="(o, i) in schedule.order" :key="i">
          <view-button
            v-if="o === NaN"
            :id="`schedule${i}`"
            :order="order"
          ></view-button>
          <view-button
            :id="`schedule${i}`"
            :value="schedule.nama[o]"
            :order="order"
            @click.native="(e) => nameClick(e, o)"
          ></view-button>
          <v-divider></v-divider>
        </div>
      </div>
      <div class="d-inline-block">
        <div :style="{ position: 'sticky', top: 0, zIndex: 9 }" class="shadow">
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
          <schedule-button
            v-if="o === NaN"
            v-for="d in schedule.day"
            :key="d"
          ></schedule-button>
          <schedule-button
            v-for="(s, j) in schedule.shift[o]"
            :key="j"
            :shift="s"
            :job="schedule.job[o][j]"
            :active="active(j, o)"
            @click.native="(e) => ranged(e, j, o)"
          ></schedule-button>
          <v-divider></v-divider>
        </div>
      </div>
      <div class="d-inline-block">
        <div :style="{ position: 'sticky', top: 0, zIndex: 9 }" class="shadow">
          <v-btn height="35" width="120" depressed small tile color="white">
            Total Jam
          </v-btn>
          <v-divider></v-divider>
        </div>
        <div v-for="(jam, i) in schedule.jam" :key="i">
          <v-btn
            :ripple="false"
            height="35"
            width="120"
            depressed
            small
            tile
            color="white"
          >
            {{ jam }}
          </v-btn>
          <v-divider></v-divider>
        </div>
      </div>
      <schedule-menu
        :staff.sync="staff"
        :day.sync="day"
        :menu.sync="menu"
        :switches="switches"
        :x="x"
        :y="y"
      ></schedule-menu>
    </div>
    <v-row style="height: 40px" no-gutters align="center" justify="end">
      <v-switch
        v-model="switches"
        :hide-details="true"
        inset
        class="ma-0 pa-0 mr-4"
        color="teal"
        label="Jobs"
        dense
      ></v-switch>
      <v-switch
        v-model="order"
        :hide-details="true"
        inset
        class="ma-0 pa-0 mr-4"
        color="teal"
        label="Order"
        dense
      ></v-switch>
    </v-row>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import ScheduleButton from '@/components/schedule/schedule-button'
import ScheduleMenu from '@/components/schedule/schedule-menu'
import ViewButton from '@/components/schedule/schedule-view-button'

export default {
  layout: 'blank',
  components: {
    ScheduleButton,
    ScheduleMenu,
    ViewButton
  },
  data() {
    return {
      day: [],
      staff: undefined,
      menu: false,
      x: 0,
      y: 0,
      switches: false,
      order: false
    }
  },
  computed: {
    ...mapState(['schedule']),
    ...mapGetters('schedule', ['dayColor'])
  },
  methods: {
    ranged(event, day, staff) {
      if (
        this.day.length === 0 ||
        this.day.length === 2 ||
        this.staff !== staff
      ) {
        this.staff = staff
        this.day = [day]
      } else if (this.day[0] < day) {
        this.day.push(day)
      } else if (this.day[0] > day) {
        this.day.unshift(day)
      } else {
        this.staff = undefined
        this.day = []
      }
      this.showMenu(event)
    },
    active(day, staff) {
      if (
        this.staff === staff &&
        (day === this.day[0] || (day > this.day[0] && day <= this.day[1]))
      ) {
        return true
      }
      return false
    },
    nameClick(event, staff) {
      if (this.staff === staff) {
        this.day = []
        this.staff = undefined
      } else {
        this.staff = staff
        this.day = [0, this.schedule.day - 1]
      }
      this.showMenu(event)
    },
    showMenu(e) {
      if (this.staff === undefined) return (this.menu = false)
      this.x = e.clientX
      this.y = e.clientY
      this.menu = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

.v-btn {
  border-right: 1px solid map-get($grey, lighten-2) !important;
}

.shadow {
  -webkit-box-shadow: 4px 0px 5px 0px rgba(0, 0, 0, 0.27);
  -moz-box-shadow: 4px 0px 5px 0px rgba(0, 0, 0, 0.27);
  box-shadow: 4px 0px 5px 0px rgba(0, 0, 0, 0.27);
}
</style>
