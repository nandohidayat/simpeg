<template>
  <v-card>
    <v-tabs v-model="tab" color="teal" grow>
      <v-tab :to="{ name: 'pendapatan' }">Daftar Pendapatan</v-tab>
      <v-tab :to="{ name: 'pendapatan-template' }"
        >Download / Upload Template</v-tab
      >
      <v-tab :to="{ name: 'pendapatan-email' }">Kirim Email Pendapatan</v-tab>
      <v-tab v-if="hadOption(9)" :to="{ name: 'pendapatan-manage' }"
        >Manage Template</v-tab
      >
    </v-tabs>
    <v-divider></v-divider>
    <v-card-text>
      <nuxt-child />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('pendapatanprofil/fetchProfils', { select: 1 }),
      store.dispatch('karyawan/fetchKaryawans', { select: 1 }),
    ])
  },
  data() {
    return {
      tab: undefined,
    }
  },
  computed: {
    ...mapGetters('user', ['hadOption']),
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
