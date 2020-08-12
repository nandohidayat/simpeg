<template>
  <v-card class="px-4" outlined>
    <v-row>
      <v-col cols="4">
        <v-menu
          ref="menu"
          v-model="menu"
          :transition="false"
          :close-on-content-click="false"
          offset-y
          max-width="290px"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              :value="dateMoment"
              v-bind="attrs"
              readonly
              outlined
              dense
              label="Tanggal"
              hide-details
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="selectedDate"
            color="teal"
            type="month"
            no-title
            locale="id-id"
            @input="
              menu = false
              getAbsens()
            "
          >
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="4">
        <v-autocomplete
          v-model="selectedDept"
          :items="departemen.departemens"
          :item-value="(obj) => obj.id_dept"
          :item-text="(obj) => obj.nm_dept"
          label="Departemen"
          dense
          outlined
          hide-details
          @change="getPegawais()"
        ></v-autocomplete>
      </v-col>
      <v-col cols="4">
        <v-autocomplete
          v-model="selectedPegawai"
          :items="pegawai.pegawais"
          :item-value="(obj) => obj.id_pegawai"
          :item-text="(obj) => obj.nm_pegawai"
          label="Pegawai"
          dense
          outlined
          hide-details
          @change="getAbsens()"
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 7),
      selectedDept: undefined,
      selectedPegawai: undefined,
      menu: false,
    }
  },
  computed: {
    ...mapState(['departemen', 'pegawai']),
    dateMoment() {
      return moment(this.selectedDate).locale('id').format('MMMM YYYY')
    },
    year() {
      return parseInt(this.selectedDate.substr(0, 4))
    },
    month() {
      return parseInt(this.selectedDate.slice(-2))
    },
  },
  methods: {
    async getPegawais() {
      this.selectedPegawai = undefined
      await this.$store.dispatch('pegawai/fetchPegawais', {
        dept: this.selectedDept,
        select: 1,
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
  },
}
</script>
