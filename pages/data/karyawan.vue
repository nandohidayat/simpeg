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
  </div>
</template>

<script>
import { mapState } from 'vuex'

import baseTable from '@/components/data/base-table'
import shiftForm from '@/components/shift/shift-form'
import shiftDepartemen from '@/components/shift/shift-departemen'

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
    'shift-departemen': shiftDepartemen
  },
  data() {
    return {
      headerShift: [
        { text: 'Mulai', value: 'mulai' },
        { text: 'Selesai', value: 'selesai' },
        { text: 'Kode', value: 'kode' }
      ]
    }
  },
  computed: {
    ...mapState(['departemen', 'ruang', 'shift'])
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('departemen/fetchDepartemens'),
      // store.dispatch('ruang/fetchRuangs'),
      store.dispatch('shift/fetchShifts')
    ])
  }
}
</script>

<style scoped></style>
