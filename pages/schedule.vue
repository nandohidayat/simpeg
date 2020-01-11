<template>
  <div>
    <schedule-table
      v-model="date"
      :year="year()"
      :month="month()"
    ></schedule-table>
    <v-row>
      <v-col cols="7">
        <absen-card :year="year()" :month="month()"></absen-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import scheduleTable from '@/components/schedule/schedule-table'
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
    'absen-card': absenCard
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 7)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    Promise.all([
      this.$store.dispatch('schedule/fetchSchedules', {
        year: this.year(),
        month: this.month()
      }),
      this.$store.dispatch('shift/fetchShifts'),
      this.$store.dispatch('karyawan/fetchKaryawans', { select: 1 })
    ])
  },
  methods: {
    year() {
      return parseInt(this.date.substr(0, 4))
    },
    month() {
      return parseInt(this.date.slice(-2))
    }
  }
}
</script>
