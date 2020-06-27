<template>
  <div>
    <v-tabs v-model="tab" color="teal" grow>
      <v-tab>Schedule</v-tab>
      <v-tab>Absen</v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="tab"
      class="mt-3"
      style="background-color: transparent;"
    >
      <v-tab-item>
        <schedule-option
          :dept.sync="dept"
          :date.sync="date"
          :year="year"
          :month="month"
          :order="order"
        ></schedule-option>
        <schedule-table :order.sync="order" class="mt-3"></schedule-table>
      </v-tab-item>
      <v-tab-item>
        <absen-tab></absen-tab>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import ScheduleTable from '@/components/schedule/schedule-table'
import ScheduleOption from '@/components/schedule/schedule-table-option'
import AbsenTab from '@/components/absen/absen-tab'

export default {
  middleware: 'access',
  components: {
    ScheduleTable,
    ScheduleOption,
    AbsenTab,
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('shift/fetchShifts'),
      store.dispatch('job/fetchJobs'),
    ])
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      dept: undefined,
      tab: undefined,
      order: false,
    }
  },
  computed: {
    ...mapState(['schedule', 'departemen']),
    year() {
      return parseInt(this.date.substr(0, 4))
    },
    month() {
      return parseInt(this.date.slice(-2))
    },
    updater() {
      return `${this.dept}${this.date}`
    },
  },
  watch: {
    async updater(val) {
      await this.$store.dispatch('schedule/fetchSchedules', {
        year: this.year,
        month: this.month,
        dept: this.dept,
      })
    },
  },
  async created() {
    await this.$store.dispatch('schedule/fetchSchedules', {
      year: this.year,
      month: this.month,
    })

    this.dept = this.departemen.departemens[0].id_dept

    await Promise.all([
      this.$store.dispatch('shift/fetchShift', this.dept),
      this.$store.dispatch('job/fetchJob', this.dept),
    ])
  },
  head() {
    return {
      title: 'Jadwal Karyawan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Jadwal Karyawan',
        },
      ],
    }
  },
}
</script>
