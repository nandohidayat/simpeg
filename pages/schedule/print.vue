<template>
  <div class="pa-8 a4">
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
          <td v-for="i in last" :key="i" style="width: 28px" class="sch">
            {{ i }}
          </td>
        </tr>
        <tr v-for="(s, i) in schedule">
          <td class="text-center sch">{{ i + 1 }}</td>
          <td class="text-truncate sch" style="max-width: 130px">
            {{ s.nama }}
          </td>
          <td
            v-for="is in last"
            :key="is"
            :class="{
              weekend: weekend.includes(is),
              holiday: holiday.includes(is)
            }"
            class="sch"
          >
            P
          </td>
        </tr>
      </table>
    </div>
    <div class="ml-12 mt-8 body-2">
      <h4>Keterangan :</h4>
      <div v-for="s in shift" :key="s">
        <span class="d-inline-block" style="width: 25px">{{ s.kode }}</span> =
        {{ s.keterangan }}
      </div>
      <div>
        <table>
          <tr v-for="c in color" :key="c">
            <td style="width: 140px">{{ c.keterangan }}</td>
            <td :style="`background-color: ${c.color}; width: 30px`"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/id'

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
  layout: 'blank',
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      dept: 'Instalasi SIM',
      last: 31,
      weekend: [1, 8, 15, 22, 29],
      holiday: [25],
      schedule: [
        {
          nama: 'Rifa Yulfiah'
        },
        {
          nama: 'Julain Pradita Alam'
        },
        {
          nama: 'Salman Syariefudin'
        },
        {
          nama: 'M. Ibrahim Ulil Albab M. Ibrahim Ulil Albab '
        },
        {
          nama: 'M. Nando Hidayat'
        }
      ],
      shift: [
        {
          kode: 'P',
          keterangan: 'Pagi'
        },
        {
          kode: 'S',
          keterangan: 'Siang'
        },
        {
          kode: 'PS',
          keterangan: 'Pagi Siang'
        },
        {
          kode: 'TL',
          keterangan: 'Tugas Luar'
        },
        {
          kode: 'CT',
          keterangan: 'Cuti'
        }
      ],
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
  computed: {
    dateMoment() {
      return this.date
        ? moment(this.date)
            .locale('id')
            .format('MMMM YYYY')
        : ''
    }
  }
}
</script>

<style scoped>
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

.weekend {
  background-color: lightgrey;
}

.holiday {
  background-color: lightcoral;
}
</style>
