<template>
  <div>
    <schedule-table
      :date="date"
      :year="year"
      :month="month"
      :dept="dept"
      :updater="updater"
      @update-date="updateDate"
      @update-dept="updateDept"
    ></schedule-table>
    <v-row>
      <v-col cols="7">
        <absen-card :year="year" :month="month" :dept="dept"></absen-card>
      </v-col>
      <v-col cols="5">
        <schedule-change-card
          :year="year"
          :month="month"
          :dept="dept"
        ></schedule-change-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import scheduleTable from '@/components/schedule/schedule-table'
import scheduleChangeCard from '@/components/schedule/schedule-change-card'
import absenCard from '@/components/absen/absen-card'

export default {
  head() {
    return {
      title: 'Jadwal Karyawan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Jadwal Karyawan'
        }
      ]
    }
  },
  components: {
    'schedule-table': scheduleTable,
    'schedule-change-card': scheduleChangeCard,
    'absen-card': absenCard
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      dept: undefined
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
      return '' + this.dept + this.year + this.month + ''
    }
  },
  async fetch({ store }) {
    await store.dispatch('shift/fetchShifts')
  },
  async created() {
    await this.$store.dispatch('schedule/fetchSchedules', {
      year: this.year,
      month: this.month
    })

    this.dept = this.departemen.departemens[0].id_dept

    await this.$store.dispatch('schedulechange/fetchSchedules', {
      year: this.year,
      month: this.month,
      dept: this.dept
    })
  },
  methods: {
    updateDate(val) {
      this.date = val
    },
    updateDept(val) {
      this.dept = val
    }
  }
}
</script>
