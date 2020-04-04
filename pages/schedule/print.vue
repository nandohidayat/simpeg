<template>
  <div class="pa-8 a4 blank">
    <h2 class="text-center text-uppercase mb-10">JADWAL KERJA {{ dept }}</h2>
    <div class="body-2">
      <h4>Bulan : {{ dateMoment }}</h4>
      <table class="full sch">
        <tr class="font-weight-bold text-center">
          <td rowspan="2" class="sch">No</td>
          <td rowspan="2" class="sch">Nama</td>
          <td colspan="31" class="sch text-center">Tanggal</td>
        </tr>
        <tr class="font-weight-bold text-center">
          <td v-for="i in last" :key="i" style="width: 27px" class="sch">
            {{ i }}
          </td>
        </tr>
        <tr v-for="(s, i) in schedule.schedules">
          <td class="text-center sch">{{ i + 1 }}</td>
          <td
            class="text-truncate text-capitalize sch"
            style="max-width: 130px"
          >
            {{ lowerName(s.nama) }}
          </td>
          <td
            v-for="is in last"
            :key="is"
            :class="{
              holiday: schedule.holiday.includes(is),
              weekend: schedule.weekend.includes(is)
            }"
            class="sch"
          >
            {{ s[`day${is}`] }}
          </td>
        </tr>
      </table>
    </div>
    <div class="ml-12 mt-8 body-2">
      <h4>Keterangan :</h4>
      <div v-for="s in shift.shifts" :key="s">
        <span class="d-inline-block" style="width: 25px">{{ s.kode }}</span>
        <span class="mr-2">=</span>
        {{ s.keterangan }}
      </div>
      <div>
        <table>
          <tr>
            <td style="width: 140px">{{ color[0].keterangan }}</td>
            <td
              :style="`background-color: ${color[0].color}; width: 30px`"
            ></td>
          </tr>
          <tr v-if="schedule.holiday.length > 0">
            <td style="width: 140px">{{ color[1].keterangan }}</td>
            <td
              :style="`background-color: ${color[1].color}; width: 30px`"
            ></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/id'
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: `Jadwal Kerja ${this.dept}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Try'
        }
      ]
    }
  },
  data() {
    return {
      color: [
        {
          color: 'lightgrey',
          keterangan: 'Hari Minggu'
        },
        {
          color: 'lightcoral',
          keterangan: 'Hari Libur'
        }
      ]
    }
  },

  layout: 'blank',
  computed: {
    ...mapState(['departemen', 'schedule', 'shift']),
    dateMoment() {
      return this.date
        ? moment(this.date)
            .locale('id')
            .format('MMMM YYYY')
        : ''
    },
    date() {
      return this.$route.query.date
    },
    dept() {
      return this.departemen.departemen
    },
    last() {
      return moment(this.date)
        .endOf('month')
        .get('date')
    }
  },
  async fetch({ store, route }) {
    await store.dispatch('schedule/printSchedules', {
      dept: route.query.dept,
      date: route.query.date
    })
  },
  methods: {
    lowerName(name) {
      return name.toLowerCase()
    }
  }
}
</script>

<style scoped>
.blank {
  background-color: #ffffff;
}

.sch {
  border: 1px solid black;
  border-collapse: collapse;
  padding-left: 1px;
  padding-right: 1px;
}

.full {
  width: 100%;
}

.a4 {
  width: 297mm;
  font-family: 'Times New Roman', Times, serif;
}

.holiday {
  background-color: lightcoral;
}

.weekend {
  background-color: lightgrey;
}
</style>
