<template>
  <div>
    <!-- <v-row>
      <v-col cols="6">
        <base-table :items="departemen.departemens" data="departemen">
        </base-table>
      </v-col>
      <v-col cols="6">
        <base-table :items="ruang.ruangs" data="ruang"> </base-table>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col cols="6">
        <base-table :header="headerShift" :items="shift.shifts" data="shift">
          <template v-slot:baseform="{ newdata }">
            <shift-form :newdata="newdata"></shift-form>
          </template>
        </base-table>
      </v-col>
      <v-col cols="6">
        <shift-departemen></shift-departemen>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <base-table
          :header="headerPendapatanHarian"
          :items="pendapatanharian.pendapatans"
          data="pendapatan harian"
        >
          <template v-slot:baseform="{ newdata }">
            <pendapatan-harian-form :newdata="newdata"></pendapatan-harian-form>
          </template>
        </base-table>
      </v-col>
      <v-col cols="6">
        <schedule-assessor></schedule-assessor>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import baseTable from '@/components/data/base-table'
import shiftForm from '@/components/shift/shift-form'
import pendapatanHarianForm from '@/components/pendapatan/pendapatan-harian-form'
import shiftDepartemen from '@/components/shift/shift-departemen'
import scheduleAssessor from '@/components/schedule/schedule-assessor-card'

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
    'base-table': baseTable,
    'shift-form': shiftForm,
    'shift-departemen': shiftDepartemen,
    'pendapatan-harian-form': pendapatanHarianForm,
    'schedule-assessor': scheduleAssessor
  },
  data() {
    return {
      headerShift: [
        { text: 'Mulai', value: 'mulai' },
        { text: 'Selesai', value: 'selesai' },
        { text: 'Kode', value: 'kode' }
      ],
      headerPendapatanHarian: [
        { text: 'Tanggal', value: 'tgl' },
        { text: 'Pendapatan', value: 'pendapatan' }
      ]
    }
  },
  computed: {
    ...mapState(['departemen', 'ruang', 'shift', 'pendapatanharian'])
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
