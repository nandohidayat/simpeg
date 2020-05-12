<template>
  <div>
    <v-row>
      <v-col cols="6">
        <shift></shift>
      </v-col>
      <v-col cols="6">
        <job></job>
      </v-col>
      <v-col cols="12">
        <dept-sj></dept-sj>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <!-- <pendapatan-harian></pendapatan-harian> -->
      </v-col>
      <v-col cols="6">
        <schedule-access></schedule-access>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DeptSj from '@/components/departemen/dept-sj'
import ScheduleAccess from '@/components/schedule/schedule-access-card'
// import pendapatanHarian from '@/components/pendapatan/pendapatan-harian-card'
import shift from '@/components/shift/shift-card'
import job from '@/components/job/job-card'

export default {
  head() {
    return {
      title: 'Database Karyawan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Data Karyawan'
        }
      ]
    }
  },
  components: {
    DeptSj,
    ScheduleAccess,
    // 'pendapatan-harian': pendapatanHarian,
    shift,
    job
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('departemen/fetchDepartemens'),
      store.dispatch('shift/fetchShifts'),
      store.dispatch('job/fetchJobs'),
      store.dispatch('pendapatanharian/fetchPendapatans'),
      store.dispatch('scheduleaccess/fetchSchedules')
    ])
  }
}
</script>

<style scoped></style>
