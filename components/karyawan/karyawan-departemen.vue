<template>
  <div>
    <v-data-table
      :headers="header"
      :items="logdepartemen.logs"
      multi-sort
      :items-per-page="100"
    >
      <template #top>
        <v-toolbar flat class="my-2">
          <v-toolbar-title>Mutasi Departemen</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="teal" dark depressed @click="openDialog()"
            ><v-icon left>mdi-plus</v-icon>Tambah Mutasi</v-btn
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
    <departemen-form
      v-model="dialog"
      :edit="edit"
      :data="data"
    ></departemen-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import BaseConfirm from '@/components/base/base-confirm'
import DepartemenForm from '@/components/karyawan/karyawan-departemen-form'

export default {
  components: {
    BaseConfirm,
    DepartemenForm,
  },
  props: {
    id: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      header: [
        { text: 'Departemen', value: 'nm_dept' },
        { text: 'Masuk', value: 'masuk' },
        { text: 'Keluar', value: 'keluar' },
        { text: 'Action', value: 'action' },
      ],
      dialog: false,
      edit: false,
      data: undefined,
      confirm: false,
      text: '',
      delete: undefined,
      newLog: {
        dept: undefined,
        masuk: undefined,
        keluar: undefined,
      },
    }
  },
  computed: {
    ...mapState(['logdepartemen']),
  },
  methods: {
    openDialog(item = undefined) {
      if (item) {
        this.edit = true
        this.data = { ...item, pegawai: this.id }
      } else {
        this.edit = false
        this.data = { ...this.newLog, pegawai: this.id }
      }
      this.dialog = true
    },
    deleteConfirm(del) {
      this.delete = del
      this.text = `Hapus mutasi?`
      this.confirm = true
    },
    async deleteData() {
      try {
        await this.$store.dispatch(
          'logdepartemen/deleteLog',
          this.delete.id_log_departemen
        )

        this.confirm = false
        this.$alert('success', 'Successfully Deleted')
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
}
</script>
