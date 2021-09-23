<template>
  <v-card>
    <v-card-text>
      <v-data-table
        :headers="header"
        :items="pendapatanharian.pendapatans"
        multi-sort
        :items-per-page="100"
      >
        <template #top>
          <v-toolbar flat class="my-2">
            <v-toolbar-title>Pendapatan Harian</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="teal" dark depressed @click="openDialog()"
              ><v-icon left>mdi-plus</v-icon>Tambah Pendapatan</v-btn
            >
          </v-toolbar>
        </template>
        <template #item.action="{ item }">
          <v-icon @click="openDialog(item)"> mdi-pencil </v-icon>
          <v-icon @click="deleteConfirm(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
      <base-confirm
        v-model="confirm"
        :text="text"
        @confirm="deleteData()"
      ></base-confirm>
      <pendapatan-form
        v-model="dialog"
        :edit="edit"
        :data="data"
      ></pendapatan-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

import BaseConfirm from '@/components/base/base-confirm'
import PendapatanForm from '@/components/pendapatan/pendapatan-harian-form'

export default {
  components: {
    BaseConfirm,
    PendapatanForm,
  },
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](15)) {
      return redirect('/404')
    }
  },
  async fetch({ store }) {
    await store.dispatch('pendapatanharian/fetchPendapatans')
  },
  data() {
    return {
      header: [
        {
          text: 'Tanggal',
          value: 'tgl',
        },
        {
          text: 'Pendapatan',
          value: 'pendapatan',
        },
        {
          text: 'Actions',
          value: 'action',
        },
      ],
      dialog: false,
      edit: false,
      data: undefined,
      confirm: false,
      text: '',
      delete: undefined,
      newPendapatan: {
        tgl: undefined,
        pendapatan: undefined,
      },
    }
  },
  computed: {
    ...mapState(['pendapatanharian']),
  },
  methods: {
    openDialog(item = undefined) {
      if (item) {
        this.edit = true
        this.data = item
      } else {
        this.edit = false
        this.data = this.newPendapatan
      }
      this.dialog = true
    },
    deleteConfirm(del) {
      this.delete = del
      this.text = `Hapus pendapatan?`
      this.confirm = true
    },
    async deleteData() {
      try {
        await this.$store.dispatch(
          'pendapatanharian/deletePendapatan',
          this.delete.id_pendapatan_harian
        )

        this.confirm = false
        this.$alert('success', 'Successfully Deleted')
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
  head() {
    return {
      title: 'Pendapatan Harian',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Pendapatan Harian',
        },
      ],
    }
  },
}
</script>
