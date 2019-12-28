<template>
  <base-card data="absen">
    <v-autocomplete
      v-model="selected"
      :items="karyawan.karyawans"
      :item-text="(obj) => obj.nama"
      :item-value="(obj) => obj.nik"
      @change="getAbsen()"
      dense
      clearable
    ></v-autocomplete>
    <v-data-table
      :headers="header"
      :items="absen.absen"
      multi-sort
    ></v-data-table>
  </base-card>
</template>

<script>
import { mapState } from 'vuex'

import baseCard from '@/components/data/base-card'

export default {
  components: {
    'base-card': baseCard
  },
  data() {
    return {
      selected: undefined,
      header: [
        { text: 'Tanggal', value: 'tanggal' },
        { text: 'Waktu', value: 'waktu' },
        { text: 'Keterangan', value: 'keterangan' }
      ]
    }
  },
  computed: {
    ...mapState(['karyawan', 'absen'])
  }
}
</script>

<style scoped></style>
