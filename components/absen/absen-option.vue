<template>
  <v-row no-gutters justify="center">
    <v-col cols="8">
      <v-card class="px-4" outlined>
        <v-row>
          <v-col cols="4">
            <a-config-provider :locale="id">
              <a-month-picker
                v-model="selectedDate"
                format="MMMM YYYY"
                style="width: 100%;"
                size="small"
                @change="getAbsens()"
              >
              </a-month-picker>
            </a-config-provider>
          </v-col>
          <v-col cols="4">
            <a-select
              v-model="selectedDept"
              show-search
              placeholder="Departemen"
              style="width: 100%;"
              size="small"
              allow-clear
              :filter-option="filterOption"
              :options="departemen.departemens"
              @change="getPegawais()"
            ></a-select>
          </v-col>
          <v-col cols="4">
            <a-select
              v-model="selectedPegawai"
              show-search
              placeholder="Pegawai"
              style="width: 100%;"
              size="small"
              allow-clear
              :filter-option="filterOption"
              :options="pegawai.pegawais"
              @change="getAbsens()"
            ></a-select>
          </v-col>
        </v-row>
        <v-row v-if="hadAkses(18)">
          <v-col cols="4" offset="4" class="pt-0">
            <v-row no-gutters>
              <v-col
                ><a-checkbox v-model="detail">
                  Detail
                </a-checkbox></v-col
              >
              <v-col
                ><a-checkbox v-model="terlambat">
                  Terlambat
                </a-checkbox></v-col
              >
            </v-row>
          </v-col>
          <v-col cols="4" class="pt-0">
            <a-button block type="primary" size="small" @click="exportAbsen()"
              >Download</a-button
            >
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'
import id from 'ant-design-vue/lib/locale-provider/id_ID'
import 'moment/locale/fr'

moment.locale('id')

export default {
  filters: {
    showDate(value) {
      return moment(value).format('MMMM YYYY')
    },
  },
  data() {
    return {
      id,
      selectedDate: moment(),
      selectedDept: undefined,
      selectedPegawai: undefined,
      menu: false,
      detail: false,
      terlambat: false,
    }
  },
  errorCaptured() {
    return false
  },
  computed: {
    ...mapState(['departemen', 'pegawai']),
    ...mapGetters('user', ['hadAkses']),
    dateMoment() {
      return moment(this.selectedDate).locale('id').format('MMMM YYYY')
    },
    year() {
      return parseInt(this.selectedDate.format('YYYY'))
    },
    month() {
      return parseInt(this.selectedDate.format('MM'))
    },
  },
  methods: {
    async getPegawais() {
      this.selectedPegawai = undefined
      await this.$store.dispatch('pegawai/fetchPegawais', {
        dept: this.selectedDept,
        select: 1,
        ant: 1,
      })
    },
    async getAbsens() {
      if (this.selectedPegawai === undefined) return
      await this.$store.dispatch('absen/fetchAbsen', {
        pegawai: this.selectedPegawai,
        year: this.year,
        month: this.month,
      })
    },
    exportAbsen() {
      const win = window.open(
        `${
          this.$axios.defaults.baseURL
        }absen/export?month=${this.selectedDate.format('YYYY-MM-DD')}&dept=${
          this.selectedDept || ''
        }&pegawai=${this.selectedPegawai || ''}&detail=${
          this.detail
        }&terlambat=${this.terlambat}`,
        '_blank'
      )
      win.focus()
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
  },
}
</script>
