<template>
  <div>
    <v-card outlined class="mb-3">
      <v-card-text>
        <v-row align="center">
          <v-col cols="3">
            <v-select
              v-model="profil"
              label="Profil"
              dense
              outlined
              hide-details
              :items="pendapatanprofil.profils"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              v-model="tipe"
              label="Tipe"
              dense
              outlined
              hide-details
              :items="pendapatanprofil.tipe"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-menu v-model="menu" :close-on-content-click="false" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="dateMoment"
                  label="Bulan"
                  outlined
                  dense
                  readonly
                  hide-details
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                color="teal"
                type="month"
                no-title
                locale="id-id"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="3">
            <v-btn
              :disabled="disBtn"
              color="teal"
              dark
              depressed
              block
              @click="exPen"
              ><v-icon left>mdi-download</v-icon> Download</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card outlined>
      <v-data-table
        dense
        :headers="pendapatanpeg.header"
        :items="pendapatanpeg.pendapatans"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      profil: undefined,
      tipe: undefined,
      date: new Date().toISOString().substr(0, 7),
      menu: false,
    }
  },
  computed: {
    ...mapState(['pendapatanprofil', 'pendapatanpeg']),
    dateMoment() {
      return this.date ? moment(this.date).locale('id').format('MMMM YYYY') : ''
    },
    disBtn() {
      return !(this.tipe && this.profil)
    },
    updater() {
      return this.tipe + this.profil + this.date
    },
  },
  watch: {
    updater(val) {
      if (this.tipe && this.profil) {
        this.getPen()
      }
    },
  },
  methods: {
    // export pendapatan
    exPen() {
      this.$store.dispatch('pendapatanpeg/exportPendapatan', {
        profil: this.profil,
        tipe: this.tipe,
        date: moment(this.date).format('MM-YYYY'),
      })
    },
    async getPen() {
      try {
        await this.$store.dispatch('pendapatanpeg/fetchPendapatans', {
          profil: this.profil,
          tipe: this.tipe,
          date: this.date,
        })
      } catch (err) {
        this.$alert('error', err)
      }
    },
  },
  head() {
    return {
      title: 'Pendapatan Karyawan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Pendapatan Karyawan',
        },
      ],
    }
  },
}
</script>
