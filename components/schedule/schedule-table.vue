<template>
  <v-card outlined>
    <div style="max-height: 450px; overflow: auto;">
      <div style="white-space: nowrap; display: table;">
        <!-- <schedule-name
        :staff.sync="staff"
        :day.sync="day"
        :order="order"
        @menu="showMenu($event)"
      ></schedule-name>
      <schedule-day
        :staff.sync="staff"
        :day.sync="day"
        @menu="showMenu($event)"
      ></schedule-day>
      <schedule-jam></schedule-jam>
      -->

        <schedule-header></schedule-header>
        <draggable v-model="schedule.order" group="nama" :disabled="!order">
          <schedule-row
            v-for="(o, i) in schedule.order"
            :key="i"
            :idx-data="o"
            :idx-order="i"
            :order="order"
            @menu="showMenu($event)"
          ></schedule-row>
        </draggable>
        <schedule-menu
          :staff.sync="staff"
          :day.sync="day"
          :menu.sync="menu"
          :x="x"
          :y="y"
        ></schedule-menu>
      </div>
    </div>
    <v-row class="px-3">
      <v-col cols="6">
        <table style="font-size: 10pt;">
          <tr>
            <td class="px-3" colspan="2">Keterangan:</td>
          </tr>
          <tr v-for="s in fShift(true)" :key="s.id_shift">
            <td class="px-3">{{ s.kode }}</td>
            <td>({{ showTime(s.mulai) }} - {{ showTime(s.selesai) }})</td>
          </tr>
        </table>
      </v-col>
      <v-col cols="6">
        <v-switch
          :value="order"
          :hide-details="true"
          inset
          color="teal"
          label="Order"
          style="width: 100px;"
          class="ml-auto"
          dense
          @change="$emit('update:order', !order)"
        ></v-switch>
      </v-col>
    </v-row>
    <v-overlay :value="schedule.overlay" absolute z-index="10">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import draggable from 'vuedraggable'

import ScheduleMenu from '@/components/schedule/schedule-menu'
// import ScheduleName from '@/components/schedule/schedule-table-name'
// import ScheduleDay from '@/components/schedule/schedule-table-day'
// import ScheduleJam from '@/components/schedule/schedule-table-jam'
import ScheduleHeader from '@/components/schedule/schedule-table-header.vue'
import ScheduleRow from '@/components/schedule/schedule-table-row.vue'

export default {
  layout: 'blank',
  components: {
    ScheduleMenu,
    // ScheduleName,
    // ScheduleDay,
    // ScheduleJam,
    ScheduleHeader,
    ScheduleRow,
    draggable,
  },
  props: {
    order: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      day: [],
      staff: undefined,
      menu: false,
      x: 0,
      y: 0,
      switches: false,
      drag: false,
    }
  },
  computed: {
    ...mapState(['schedule']),
    ...mapGetters('user', ['hadOption']),
    ...mapGetters('shift', ['fShift']),
  },
  methods: {
    showMenu(e) {
      if (this.schedule.selectedStaff === undefined || this.order === true)
        return (this.menu = false)
      this.x = e.clientX
      this.y = e.clientY
      this.menu = true
    },
    showTime(time) {
      return moment(time, 'HH:mm:ss').format('HH:mm')
    },
  },
}
</script>
