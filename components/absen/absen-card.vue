<template>
  <v-card>
    <v-autocomplete
      v-if="!single"
      v-model="selected"
      :items="karyawan.karyawans"
      :item-text="(obj) => obj.nm_pegawai"
      :item-value="(obj) => obj.id_pegawai"
      @change="getAbsen()"
      dense
      clearable
    ></v-autocomplete>
    <v-data-table :headers="header" :items="absen.absen" multi-sort>
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
          <td colspan="4"></td>
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
    }
  },
  props: {
    single: {
      type: Boolean,
      default: false
    },
    year: {
      type: Number,
      default: undefined
    },
    month: {
      type: Number,
      default: undefined
    },
    dept: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      selected: undefined,
      header: [
        { text: 'Tanggal', value: 'tanggal' },
        { text: 'Shift', value: 'shift' },
        { text: 'Masuk', value: 'masuk' },
        { text: 'Keluar', value: 'keluar' },
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Pendapatan', value: 'pendapatan' }
      ]
    }
  },
  computed: {
    ...mapState(['karyawan', 'absen'])
  },
  watch: {
    month(val) {
      this.getAbsen()
    },
    year(val) {
      this.getAbsen()
    },
    dept() {
      if (!this.single) {
        this.selected = undefined
      }
      this.getAbsen()
    }
  },
  methods: {
    async getAbsen() {
      if (this.selected === undefined && !this.single)
        return (this.absen.absen = [])
      try {
        await this.$store.dispatch('absen/fetchAbsen', {
          id: this.selected,
          date: { year: this.year, month: this.month, dept: this.dept }
        })
      } catch (err) {
        this.$alert('error', err)
      }
    },
    moment
  }
}
</script>

<style scoped></style>
