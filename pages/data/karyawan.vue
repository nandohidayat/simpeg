<template>
  <div>
    <v-row>
      <v-col cols="6">
        <shift></shift>
      </v-col>
      <v-col cols="6">
        <shift-departemen></shift-departemen>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <pendapatan-harian></pendapatan-harian>
      </v-col>
      <v-col cols="6">
        <schedule-assessor></schedule-assessor>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import shiftDepartemen from '@/components/shift/shift-departemen'
import scheduleAssessor from '@/components/schedule/schedule-assessor-card'
import pendapatanHarian from '@/components/pendapatan/pendapatan-harian-card'
import shift from '@/components/shift/shift-card'

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
    'shift-departemen': shiftDepartemen,
    'schedule-assessor': scheduleAssessor,
    'pendapatan-harian': pendapatanHarian,
    shift
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('departemen/fetchDepartemens'),
      store.dispatch('shift/fetchShifts'),
      store.dispatch('pendapatanharian/fetchPendapatans'),
      store.dispatch('scheduleassessor/fetchSchedules')
    ])
  }
}
</script>

<style scoped></style>
