<template>
  <v-card class="pa-4">
    <v-tabs v-model="tab" color="teal">
      <v-tab>Data Shift</v-tab>
      <v-tab>Data Akses Jadwal</v-tab>
      <v-tab>Data Pendapatan Harian</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <shift></shift>
      </v-tab-item>
      <v-tab-item>
        <schedule-access></schedule-access>
      </v-tab-item>
      <v-tab-item>
        <pendapatan-harian></pendapatan-harian>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import ScheduleAccess from '@/components/schedule/schedule-access-card'
import PendapatanHarian from '@/components/pendapatan/pendapatan-harian-card'
import Shift from '@/components/shift/shift-card'

export default {
  middleware: 'access',
  components: {
    ScheduleAccess,
    PendapatanHarian,
    Shift,
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('departemen/fetchDepartemens'),
      store.dispatch('shift/fetchShifts'),
      store.dispatch('job/fetchJobs'),
      store.dispatch('pendapatanharian/fetchPendapatans'),
      store.dispatch('scheduleaccess/fetchSchedules'),
    ])
  },
  data() {
    return {
      tab: undefined,
    }
  },
  head() {
    return {
      title: 'Database Jadwal',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Data Karyawan',
        },
      ],
    }
  },
}
</script>
