<template>
  <div>
    <v-card outlined class="mb-3">
      <v-card-text>
        <div class="overline">Download template pendapatan</div>
        <v-row align="center">
          <v-col cols="5">
            <v-select
              v-model="exTemp.profil"
              label="Profil"
              dense
              outlined
              hide-details
              :items="pendapatanprofil.profils"
            ></v-select>
          </v-col>
          <v-col cols="5">
            <v-select
              v-model="exTemp.tipe"
              label="Tipe"
              dense
              outlined
              hide-details
              :items="pendapatanprofil.tipe"
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-btn
              color="teal"
              depressed
              dark
              block
              :disabled="downDisable"
              @click="exportTemplate"
              ><v-icon left>mdi-download</v-icon> Download</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card outlined class="mb-3">
      <v-card-text>
        <div class="overline">upload template pendapatan</div>
        <v-row>
          <v-col cols="2"
            ><v-select
              v-model="imTemp.profil"
              label="Profil"
              dense
              outlined
              hide-details
              :items="pendapatanprofil.profils"
            ></v-select
          ></v-col>
          <v-col cols="2"
            ><v-select
              v-model="imTemp.tipe"
              label="Tipe"
              dense
              outlined
              hide-details
              :items="pendapatanprofil.tipe"
            ></v-select
          ></v-col>
          <v-col cols="2">
            <v-menu v-model="menu" :close-on-content-click="false" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="dateMoment()"
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
                v-model="imTemp.date"
                color="teal"
                type="month"
                no-title
                locale="id-id"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="4"
            ><v-file-input
              v-model="imTemp.file"
              label="File"
              dense
              outlined
              hide-details
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            ></v-file-input
          ></v-col>
          <v-col cols="2"
            ><v-btn
              color="teal"
              dark
              depressed
              block
              :disabled="upDisable"
              @click="importTemplate"
              ><v-icon left>mdi-upload</v-icon>Upload</v-btn
            ></v-col
          >
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      exTemp: {
        profil: undefined,
        tipe: undefined,
      },
      imTemp: {
        profil: undefined,
        tipe: undefined,
        date: new Date().toISOString().substr(0, 7),
        file: undefined,
      },
      menu: false,
    }
  },
  computed: {
    ...mapState(['pendapatanprofil']),
    downDisable() {
      return !(this.exTemp.profil && this.exTemp.tipe)
    },
    upDisable() {
      return !(
        this.imTemp.profil &&
        this.imTemp.tipe &&
        this.imTemp.date &&
        this.imTemp.file
      )
    },
  },
  methods: {
    exportTemplate() {
      this.$store.dispatch('pendapatanprofil/exportTemplate', {
        profil: this.exTemp.profil,
        tipe: this.exTemp.tipe,
      })
    },
    dateMoment(ex = false) {
      const date = ex ? '' : this.imTemp.date
      return date ? moment(date).locale('id').format('MMMM YYYY') : ''
    },
    async importTemplate() {
      try {
        await this.$store.dispatch(
          'pendapatanprofil/importTemplate',
          this.imTemp
        )
        this.$alert('success', 'Import Sukses')
      } catch (e) {
        this.$alert('err', e)
      }
    },
  },
}
</script>
