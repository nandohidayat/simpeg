<template>
  <v-card outlined>
    <div style="max-height: 450px; overflow: auto;">
      <div style="white-space: nowrap; display: table;">
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
    <schedule-footer :order.sync="realValue"></schedule-footer>
    <v-overlay :value="schedule.overlay" absolute z-index="11">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import draggable from 'vuedraggable'

import ScheduleMenu from '@/components/schedule/schedule-menu'
import ScheduleHeader from '@/components/schedule/schedule-table-header.vue'
import ScheduleRow from '@/components/schedule/schedule-table-row.vue'
import ScheduleFooter from '@/components/schedule/schedule-table-footer.vue'

export default {
  components: {
    draggable,
    ScheduleMenu,
    ScheduleHeader,
    ScheduleRow,
    ScheduleFooter,
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
      drag: false,
    }
  },
  computed: {
    ...mapState(['schedule']),
    realValue: {
      get() {
        return this.order
      },
      set(val) {
        this.$emit('update:order', val)
      },
    },
  },
  methods: {
    showMenu(e) {
      if (this.schedule.selectedStaff === undefined || this.order === true)
        return (this.menu = false)
      this.x = e.clientX
      this.y = e.clientY
      this.menu = true
    },
  },
}
</script>
