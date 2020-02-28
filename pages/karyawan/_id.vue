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
        <karyawan-data id="data-karyawan"></karyawan-data>
        <schedule-table
          id="data-jadwal"
          :read="true"
          :year="year()"
          :month="month()"
          :dept="dept"
          v-model="date"
        ></schedule-table>
        <schedule-change-card
          :year="year()"
          :month="month()"
          :dept="dept"
          single
        ></schedule-change-card>
        <absen-card
          id="data-absen"
          :year="year()"
          :month="month()"
          single
        ></absen-card>
        <karyawan-access
          id="data-akses"
          v-if="grantedAccess()"
        ></karyawan-access>
        <karyawan-delete
          id="hapus-karyawan"
          v-if="grantedDelete()"
        ></karyawan-delete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

import absenCard from '@/components/absen/absen-card'
import karyawanMenu from '@/components/karyawan/karyawan-menu'
import karyawanData from '@/components/karyawan/karyawan-data'
import karyawanAccess from '@/components/karyawan/karyawan-access'
import karyawanDelete from '@/components/karyawan/karyawan-delete'
import scheduleTable from '@/components/schedule/schedule-table'
import scheduleChangeCard from '@/components/schedule/schedule-change-card'

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
    'absen-card': absenCard,
    'karyawan-menu': karyawanMenu,
    'karyawan-data': karyawanData,
    'karyawan-access': karyawanAccess,
    'karyawan-delete': karyawanDelete,
    'schedule-table': scheduleTable,
    'schedule-change-card': scheduleChangeCard
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 7)
    }
  },
  computed: {
    ...mapState(['user', 'karyawan', 'schedule']),
    dept() {
      if (this.schedule.dept.length === 0) return undefined
      return this.schedule.dept[0].id_dept
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('karyawan/fetchKaryawan', params.id)
  },
  async created() {
    const granted = []
    if (this.grantedAccess()) {
      granted.push(
        this.$store.dispatch('user/fetchUser', this.$route.params.id)
      )
    }

    await this.$store.dispatch('schedule/fetchSchedules', {
      year: this.year(),
      month: this.month()
    })

    await Promise.all([
      this.$store.dispatch('schedulechange/fetchSchedules', {
        year: this.year(),
        month: this.month(),
        dept: this.dept
      }),
      this.$store.dispatch('absen/fetchAbsen', {
        id: this.user.user.id,
        date: { year: this.year(), month: this.month() }
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
