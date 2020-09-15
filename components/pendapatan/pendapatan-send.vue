<template>
  <div>
    <v-card outlined class="mb-3">
      <v-card-text>
        <v-row align="center">
          <v-col cols="3">
            <v-autocomplete
              v-model="data.profil"
              label="Profil"
              outlined
              dense
              hide-details
              :items="pendapatanprofil.profils"
            ></v-autocomplete>
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
                v-model="data.date"
                color="teal"
                type="month"
                no-title
                locale="id-id"
                @input="menu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="3">
            <v-autocomplete
              v-model="data.karyawan"
              :items="karyawan.karyawans"
              :item-value="(obj) => obj.id_pegawai"
              :item-text="(obj) => obj.nm_pegawai"
              label="Karyawan"
              dense
              outlined
              hide-details
              multiple
              clearable
            ></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-row no-gutters>
              <v-col cols="8" class="pr-2">
                <v-btn block color="teal" dark depressed
                  ><v-icon left>mdi-email-send</v-icon> kirim email</v-btn
                >
              </v-col>
              <v-col cols="4" class="pl-2">
                <v-btn block color="teal" dark depressed @click="getEmail"
                  ><v-icon>mdi-refresh</v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card outlined>
      <v-data-table
        :items="pendapatanemail.emails"
        :headers="header"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      data: {
        profil: undefined,
        date: new Date().toISOString().substr(0, 7),
        karyawan: [],
      },
      menu: false,
      header: [
        { text: 'Nama', value: 'nama' },
        { text: 'Email', value: 'email' },
        { text: 'Subjek', value: 'subjek' },
        { text: 'Kirim', value: 'kirim' },
        { text: 'Terkirim', value: 'terkirim' },
        { text: 'Status', value: 'status' },
      ],
    }
  },
  computed: {
    ...mapState(['pendapatanprofil', 'karyawan', 'pendapatanemail']),
    dateMoment() {
      return moment(this.data.date).locale('id').format('MMMM YYYY')
    },
  },
  methods: {
    async getEmail() {
      try {
        await this.$store.dispatch('pendapatanemail/fetchEmails', this.data)
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
}
</script>
