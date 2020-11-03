<template>
  <div>
    <schedule-option
      :dept.sync="dept"
      :date.sync="date"
      :year="year"
      :month="month"
      :order="order"
    ></schedule-option>
    <schedule-table :order.sync="order" class="mt-3"></schedule-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import ScheduleTable from '@/components/schedule/schedule-table'
import ScheduleOption from '@/components/schedule/schedule-option'

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](2)) {
      return redirect('/404')
    }
  },
  components: {
    ScheduleTable,
    ScheduleOption,
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('shift/fetchShifts'),
      store.dispatch('schedule/fetchSchedules'),
    ])
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      dept: undefined,
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
      await Promise.all([
        this.$store.dispatch('schedule/fetchSchedules', {
          year: this.year,
          month: this.month,
          dept: this.dept,
        }),
        this.$store.dispatch('shift/fetchShift', this.dept),
      ])
    },
  },
  async created() {
    this.dept = this.departemen.departemens[0].id_dept

    await Promise.all([this.$store.dispatch('shift/fetchShift', this.dept)])
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
