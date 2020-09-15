<template>
  <v-card>
    <v-tabs v-model="tab" color="teal" grow>
      <v-tab>Daftar Pendapatan</v-tab>
      <v-tab>Download / Upload Template</v-tab>
      <v-tab>Kirim Email Pendapatan</v-tab>
      <v-tab>Manage Template</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <pendapatan-list></pendapatan-list>
        </v-tab-item>
        <v-tab-item>
          <download-template></download-template>
        </v-tab-item>
        <v-tab-item>
          <pendapatan-send></pendapatan-send>
        </v-tab-item>
        <v-tab-item>
          <manage-template></manage-template>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import DownloadTemplate from '@/components/pendapatan/download-template'
import ManageTemplate from '@/components/pendapatan/profil/manage-template'
import PendapatanList from '@/components/pendapatan/pendapatan-list'
import PendapatanSend from '@/components/pendapatan/pendapatan-send'

export default {
  components: {
    DownloadTemplate,
    ManageTemplate,
    PendapatanList,
    PendapatanSend,
  },
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
