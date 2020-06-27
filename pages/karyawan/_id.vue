<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <karyawan-menu
          :access="grantedAccess"
          :delete="grantedDelete"
        ></karyawan-menu>
      </v-col>
      <v-col cols="9">
        <karyawan-data id="data-karyawan"></karyawan-data>
        <schedule-table
          id="data-jadwal"
          :read="true"
          :date="date"
          :year="year"
          :month="month"
          :dept="dept"
          :updater="updater"
          @update-date="updateDate"
          @update-dept="updateDept"
        ></schedule-table>
        <schedule-change-card
          :year="year"
          :month="month"
          :dept="dept"
          :updater="updater"
          single
        ></schedule-change-card>
        <!-- <absen-card
          id="data-absen"
          :year="year"
          :month="month"
          :dept="dept"
          single
        ></absen-card> -->
        <karyawan-access v-if="grantedAccess" id="data-akses"></karyawan-access>
        <karyawan-delete
          v-if="grantedDelete"
          id="hapus-karyawan"
        ></karyawan-delete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

// import absenCard from '@/components/absen/absen-card'
import karyawanMenu from '@/components/karyawan/karyawan-menu'
import karyawanData from '@/components/karyawan/karyawan-data'
import karyawanAccess from '@/components/karyawan/karyawan-access'
import karyawanDelete from '@/components/karyawan/karyawan-delete'
import scheduleTable from '@/components/schedule/schedule-table'
import scheduleChangeCard from '@/components/schedule/schedule-change-card'

export default {
  components: {
    // 'absen-card': absenCard,
    'karyawan-menu': karyawanMenu,
    'karyawan-data': karyawanData,
    'karyawan-access': karyawanAccess,
    'karyawan-delete': karyawanDelete,
    'schedule-table': scheduleTable,
    'schedule-change-card': scheduleChangeCard,
  },
  async fetch({ store, params }) {
    await Promise.all([
      store.dispatch('karyawan/fetchKaryawan', params.id),
      store.dispatch('shift/fetchShifts'),
    ])
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      dept: undefined,
    }
  },
  computed: {
    ...mapState(['user', 'karyawan', 'schedule', 'departemen']),
    year() {
      return parseInt(this.date.substr(0, 4))
    },
    month() {
      return parseInt(this.date.slice(-2))
    },
    updater() {
      return '' + this.dept + this.year + this.month + ''
    },
    grantedAccess() {
      return (
        this.user.user.nik === this.$route.params.id ||
        this.user.akses.includes('/karyawan')
      )
    },
    grantedDelete() {
      return this.user.akses.includes('/karyawan')
    },
  },
  async created() {
    const granted = []
    if (this.grantedAccess) {
      granted.push(
        this.$store.dispatch('user/fetchUser', this.$route.params.id)
      )
    }

    await this.$store.dispatch('schedule/fetchSchedules', {
      year: this.year,
      month: this.month,
    })

    this.dept = this.departemen.departemens[0].id_dept

    await Promise.all([
      this.$store.dispatch('schedulechange/fetchSchedules', {
        year: this.year,
        month: this.month,
        dept: this.dept,
      }),
      this.$store.dispatch('absen/fetchAbsen', {
        id: this.user.user.id,
        date: { year: this.year, month: this.month },
      }),
      ...granted,
    ])
  },
  methods: {
    updateDate(val) {
      this.date = val
    },
    updateDept(val) {
      this.dept = val
    },
  },
  head() {
    return {
      title: this.karyawan.karyawan.nama,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Data Karyawan',
        },
      ],
    }
  },
}
</script>
