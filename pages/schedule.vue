<template>
  <div>
    <schedule-table
      v-model="date"
      :year="year()"
      :month="month()"
      :dept="dept"
    ></schedule-table>
    <v-row>
      <v-col cols="7">
        <absen-card :year="year()" :month="month()" :dept="dept"></absen-card>
      </v-col>
      <v-col cols="5">
        <schedule-change-card
          :year="year()"
          :month="month()"
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
      date: new Date().toISOString().substr(0, 7)
    }
  },
  computed: {
    ...mapState(['user', 'schedule']),
    dept() {
      if (this.schedule.dept.length === 0) return undefined
      return this.schedule.dept[0].id_dept
    }
  },
  async fetch({ store }) {
    await store.dispatch('shift/fetchShifts')
  },
  async created() {
    await this.$store.dispatch('schedule/fetchSchedules', {
      year: this.year(),
      month: this.month()
    })

    await Promise.all([
      this.$store.dispatch('schedulechange/fetchSchedules', {
        year: this.year(),
        month: this.month(),
        dept: this.dept
      })
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
