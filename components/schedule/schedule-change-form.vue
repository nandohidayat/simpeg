<template>
  <div>
    <v-row align="center">
      <v-col cols="3">
        Permintaan
      </v-col>
      <v-col cols="9">
        <v-radio-group v-model="newdata['type']" row>
          <v-radio value="1" label="Tukar Shift" color="teal"></v-radio>
          <v-radio value="2" label="Cuti" color="teal"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <div v-if="newdata['type'] !== undefined">
      Tanggal
      <v-row align="center">
        <v-col cols="6">
          <v-menu v-model="menu" :close-on-content-click="false" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="newdata['mulai']"
                label="Mulai"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="newdata['mulai']"
              no-title
              scrollable
              color="teal"
              @input="menu = false"
            >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="6">
          <v-menu v-model="menu1" :close-on-content-click="false" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="newdata['selesai']"
                label="Selesai"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="newdata['selesai']"
              no-title
              scrollable
              color="teal"
              @input="menu1 = false"
            >
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <div v-if="newdata['type'] === `1`">
        Dengan
        <v-autocomplete
          v-model="newdata['dengan']"
          :items="karyawan.karyawans"
          :item-text="(obj) => obj.nm_pegawai"
          :item-value="(obj) => obj.id_pegawai"
          label="Dengan"
          clearable
        ></v-autocomplete>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    newdata: {
      type: Object,
      default: undefined,
    },
    dept: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu1: false,
    }
  },
  computed: {
    ...mapState(['karyawan']),
  },
  watch: {
    newdata: {
      handler() {
        this.newdata.dept = this.dept
        if (this.newdata.type === '2') this.newdata.dengan = undefined
      },
      deep: true,
    },
  },
}
</script>
