<template>
  <v-card outlined>
    <v-card-title>
      <v-icon large left>mdi-clipboard-account-outline</v-icon
      ><span class="title font-weight-light">Data Karyawan</span>
      <v-spacer></v-spacer>
      <karyawan-form :editing="true" :karyawan="karyawan.karyawan">
      </karyawan-form>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <span>NIK :</span>
          <span class="subtitle-1 text--primary d-block ml-3">{{
            karyawan.karyawan.nik
          }}</span>
          <span>Nama :</span>
          <span class="subtitle-1 text--primary d-block ml-3">{{
            karyawan.karyawan.nama
          }}</span>
        </v-col>
        <v-col cols="6">
          <span>Departemen :</span>
          <span class="subtitle-1 text--primary d-block ml-3">{{
            karyawan.karyawan.departemen
          }}</span>
          <span>Ruang :</span>
          <span class="subtitle-1 text--primary d-block ml-3">{{
            karyawan.karyawan.ruang
          }}</span>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

import karyawanForm from '@/components/karyawan/karyawan-form'

export default {
  components: {
    'karyawan-form': karyawanForm
  },
  computed: {
    ...mapState(['karyawan'])
  }
}
</script>

<style scoped></style>
