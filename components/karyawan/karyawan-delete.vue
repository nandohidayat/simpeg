<template>
  <v-card outlined class="mt-5">
    <v-card-title>
      <v-icon large left color="error">mdi-alert</v-icon
      ><span class="title font-weight-light error--text">Hapus Karyawan</span>
      <v-spacer></v-spacer>
      <v-btn outlined color="error" @click="deleteKaryawan"
        >Hapus Karyawan</v-btn
      >
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  methods: {
    async deleteKaryawan() {
      const res = confirm('Apakah anda yakin akan menghapus karyawan ini?')
      if (res) {
        await this.$store.dispatch(
          'karyawan/deleteKaryawan',
          this.$route.params.id
        )
        this.$router.push('/karyawan')
      }
    },
  },
}
</script>
