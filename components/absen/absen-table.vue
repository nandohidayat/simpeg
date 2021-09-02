<template>
  <v-card outlined>
    <v-data-table
      :headers="header"
      :items="absen.absens"
      multi-sort
      dense
      :items-per-page="31"
    >
      <template #item.masuk="{item}">
        {{ item.masuk | time }}
      </template>
      <template #item.keluar="{item}">
        {{ item.keluar | time }}
      </template>
      <template #item.pendapatan="{item}">
        {{ item.pendapatan | rupiah }}
      </template>
      <template #body.append>
        <tr>
          <td colspan="5"></td>
          <td>Total :</td>
          <td>{{ absen.pendapatan | rupiah }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  filters: {
    time(val) {
      return val !== null ? moment(val, 'HH:mm:ss').format('HH:mm') : ''
    },
    rupiah(val) {
      return `Rp ${parseFloat(val)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
    },
  },
  data() {
    return {
      header: [
        { text: 'Tanggal', value: 'tanggal' },
        { text: 'Departemen', value: 'dept' },
        { text: 'Shift', value: 'shift' },
        { text: 'Masuk', value: 'masuk' },
        { text: 'Keluar', value: 'keluar' },
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Pendapatan', value: 'pendapatan' },
      ],
    }
  },
  computed: {
    ...mapState(['absen']),
  },
}
</script>
