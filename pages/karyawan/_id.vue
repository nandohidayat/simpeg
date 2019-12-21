<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <karyawan-menu
          :access="grantedAccess()"
          :delete="grantedDelete()"
        ></karyawan-menu>
      </v-col>
      <v-col cols="9">
        <karyawan-data></karyawan-data>
        <schedule-table
          id="data-jadwal"
          :read="true"
          :year="year()"
          :month="month()"
          v-model="date"
        ></schedule-table>
        <karyawan-access v-if="grantedAccess()"></karyawan-access>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import karyawanMenu from '@/components/karyawan/karyawan-menu'
import karyawanData from '@/components/karyawan/karyawan-data'
import scheduleTable from '@/components/schedule/schedule-table'
import karyawanAccess from '@/components/karyawan/karyawan-access'

export default {
  head() {
    return {
      title: this.karyawan.karyawan.nama,
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
    'karyawan-menu': karyawanMenu,
    'karyawan-data': karyawanData,
    'schedule-table': scheduleTable,
    'karyawan-access': karyawanAccess
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 7)
    }
  },
  computed: {
    ...mapState(['user', 'karyawan'])
  },
  async fetch({ store, params }) {
    await Promise.all([
      store.dispatch('departemen/fetchDepartemens'),
      store.dispatch('ruang/fetchRuangs'),
      store.dispatch('karyawan/fetchKaryawan', params.id)
    ])
  },
  async created() {
    const granted = []
    if (this.grantedAccess()) {
      granted.push(
        this.$store.dispatch('user/fetchUser', this.$route.params.id)
      )
    }

    await Promise.all([
      this.$store.dispatch('schedule/fetchSchedules', {
        year: this.year(),
        month: this.month(),
        nik: this.$route.params.id
      }),
      this.$store.dispatch('shift/fetchShifts'),
      ...granted
    ])
  },
  methods: {
    grantedAccess() {
      return (
        this.user.user.nik === this.$route.params.id ||
        this.user.akses.includes('/karyawan')
      )
    },
    grantedDelete() {
      return this.user.akses.includes('/karyawan')
    },
    year() {
      return parseInt(this.date.substr(0, 4))
    },
    month() {
      return parseInt(this.date.slice(-2))
    }
  }
}
</script>

<style scoped></style>
