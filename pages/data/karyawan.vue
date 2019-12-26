<template>
  <div>
    <v-row>
      <v-col cols="6">
        <base-table :header="headerRuang" :items="ruang.ruangs" data="ruang">
          <template v-slot:baseform="{ newdata }">
            <ruang-form :newdata="newdata"></ruang-form>
          </template>
        </base-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <base-table :header="headerShift" :items="shift.shifts" data="shift">
          <template v-slot:baseform="{ newdata }">
            <shift-form :newdata="newdata"></shift-form>
          </template>
        </base-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import baseTable from '@/components/data/base-table'
import ruangForm from '@/components/ruang/ruang-form'
import shiftForm from '@/components/shift/shift-form'

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
    'ruang-form': ruangForm,
    'shift-form': shiftForm
  },
  data() {
    return {
      headerRuang: [{ text: 'Ruang', value: 'ruang' }],
      headerShift: [
        { text: 'Mulai', value: 'mulai' },
        { text: 'Selesai', value: 'selesai' },
        { text: 'Kode', value: 'kode' }
      ]
    }
  },
  computed: {
    ...mapState(['ruang', 'shift'])
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('ruang/fetchRuangs'),
      store.dispatch('shift/fetchShifts')
    ])
  }
}
</script>

<style scoped></style>
