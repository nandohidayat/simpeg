<template>
  <div>
    <dept-setup-bc></dept-setup-bc>
    <v-card>
      <v-card-text>
        <v-row no-gutters justify="center" class="mb-4">
          <v-col cols="4">
            <v-card flat outlined>
              <v-card-title class="overline py-2">Cari Departemen</v-card-title>
              <v-card-text>
                <a-input-search
                  v-model="search"
                  placeholder="Nama Departemen"
                  allow-clear
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card flat outlined>
          <v-data-table
            :headers="columns"
            :search="search"
            calculate-widths
            :items="departemen.departemens"
          >
            <template v-slot:item.action="{ item }">
              <a-button
                size="small"
                class="mr-1 sim"
                @click="openDialog(true, item)"
                >Edit Data</a-button
              >
              <a-popconfirm
                title="Anda yakin akan menghapus data ini?"
                @confirm="deleteItem(item.id_dept)"
              >
                <a-button size="small" type="danger">Hapus</a-button>
              </a-popconfirm>
            </template>
          </v-data-table>
        </v-card>
      </v-card-text>
    </v-card>
    <v-btn
      color="teal"
      dark
      depressed
      fixed
      bottom
      right
      rounded
      style="bottom: 46px"
      @click="openDialog()"
      ><v-icon small class="mr-1">mdi-plus</v-icon>tambah departemen</v-btn
    >
    <dept-setup-dialog
      :dialog.sync="dialog"
      :edit="edit"
      :id-dept="submit.id_dept"
      :nama.sync="submit.nm_dept"
      :jabatan.sync="submit.nm_jabatan"
      :folder.sync="submit.nm_folder"
      :id-pegawai.sync="submit.id_pegawai"
    ></dept-setup-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import DeptSetupBc from '@/components/departemen/dept-setup-bc'
import DeptSetupDialog from '@/components/departemen/dept-setup-dialog'

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](16)) {
      return redirect('/404')
    }
  },
  components: {
    DeptSetupBc,
    DeptSetupDialog,
  },
  async fetch({ store }) {
    await store.dispatch('departemen/fetchDepartemens')
  },
  data() {
    return {
      columns: [
        {
          text: 'Nama Departemen',
          value: 'nm_dept',
          align: 'start',
        },
        {
          text: 'Nama Jabatan',
          value: 'nm_jabatan',
          filterable: false,
        },
        {
          text: 'Kepala Bagian',
          value: 'nm_pegawai',
          filterable: false,
        },
        {
          text: 'Actions',
          value: 'action',
          filterable: false,
        },
      ],
      search: undefined,
      dialog: false,
      edit: false,
      submit: {
        id_dept: undefined,
        nm_dept: '',
        nm_jabatan: '',
        nm_folder: '',
        id_pegawai: undefined,
      },
    }
  },
  computed: {
    ...mapState(['departemen']),
  },
  methods: {
    async openDialog(edit = false, data = {}) {
      await this.$store.dispatch('karyawan/fetchKaryawans', {
        select: 1,
        for: 'ant',
      })

      if (edit) {
        this.edit = true
        this.submit = data
      } else {
        this.edit = false
        this.submit = {
          id_dept: undefined,
          nm_dept: '',
          nm_jabatan: '',
          nm_folder: '',
          id_pegawai: undefined,
        }
      }
      this.dialog = true
    },
    async deleteItem(id) {
      try {
        await this.$store.dispatch('departemen/deleteDepartemen', id)

        this.$alert('success', 'Sukses menghapus data')
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
  head() {
    return {
      title: 'Kelola Departemen',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Kelola Departemen',
        },
      ],
    }
  },
}
</script>
