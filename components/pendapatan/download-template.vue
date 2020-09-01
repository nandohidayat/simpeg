<template>
  <div>
    <v-row align="center">
      <v-col cols="5">
        <v-select
          v-model="profil"
          label="Profil"
          dense
          outlined
          hide-details
          :items="pendapatanprofil.profils"
        ></v-select>
      </v-col>
      <v-col cols="5">
        <v-select
          v-model="tipe"
          label="Tipe"
          dense
          outlined
          hide-details
          :items="pendapatanpeg.tipe"
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
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      profil: undefined,
      tipe: undefined,
    }
  },
  computed: {
    ...mapState(['pendapatanpeg', 'pendapatanprofil']),
    downDisable() {
      return !(this.profil && this.tipe)
    },
  },
  methods: {
    exportTemplate() {
      this.$store.dispatch('pendapatanpeg/exportTemplate', {
        profil: this.profil,
        tipe: this.tipe,
      })
    },
  },
}
</script>
