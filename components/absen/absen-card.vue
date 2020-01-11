<template>
  <base-card :toolbar="!single" data="absen">
    <template #title>
      <v-icon large left>mdi-fingerprint</v-icon
      ><span class="title font-weight-light">Data Absen</span>
    </template>
    <v-autocomplete
      v-if="!single"
      v-model="selected"
      :items="karyawan.karyawans"
      :item-text="(obj) => obj.nama"
      :item-value="(obj) => obj.nik"
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
      <template #body.append>
        <tr>
          <td colspan="4"></td>
          <td>Total :</td>
          <td>{{ absen.pendapatan }}</td>
        </tr>
      </template>
    </v-data-table>
  </base-card>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

import baseCard from '@/components/data/base-card'

export default {
  components: {
    'base-card': baseCard
  },
  filters: {
    time(val) {
      return val !== null ? moment(val, 'HH:mm:ss').format('HH:mm') : ''
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
    }
  },
  methods: {
    async getAbsen() {
      if (this.single) this.selected = this.$route.params.id
      if (this.selected === undefined) return (this.absen.absen = [])
      try {
        await this.$store.dispatch('absen/fetchAbsen', {
          id: this.selected,
          date: { year: this.year, month: this.month }
        })
      } catch (err) {
        this.$store.dispatch('notification/addError', err)
      }
    },
    moment
  }
}
</script>

<style scoped></style>
