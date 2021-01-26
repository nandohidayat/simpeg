<template>
  <div>
    <pdpt-setup-bc></pdpt-setup-bc>
    <v-card>
      <v-card-text>
        <v-row no-gutters justify="center" class="mb-4">
          <v-col cols="4">
            <v-card flat outlined>
              <v-card-title class="overline py-2">Cari Pendapatan</v-card-title>
              <v-card-text>
                <a-input-search
                  v-model="search"
                  placeholder="Nama Pendapatan"
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
            :items="pendapatanprofil.profils"
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
                @confirm="deleteItem(item.id_pendapatan_profil)"
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
      style="bottom: 46px;"
      @click="openDialog()"
      ><v-icon small class="mr-1">mdi-plus</v-icon>tambah departemen</v-btn
    >
    <pdpt-setup-dialog
      :dialog.sync="dialog"
      :edit="edit"
      :id-pdpt="submit.id_pendapatan_profil"
      :title.sync="submit.title"
      :view.sync="submit.view"
    ></pdpt-setup-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import PdptSetupBc from '@/components/pendapatan/pdpt-setup-bc'
import PdptSetupDialog from '@/components/pendapatan/pdpt-setup-dialog'

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](17)) {
      return redirect('/404')
    }
  },
  components: {
    PdptSetupBc,
    PdptSetupDialog,
  },
  async fetch({ store }) {
    await store.dispatch('pendapatanprofil/fetchProfils')
  },
  data() {
    return {
      columns: [
        {
          text: 'Nama Pendapatan',
          value: 'title',
          align: 'start',
        },
        {
          text: 'View',
          value: 'view',
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
        id_pendapatan_profil: undefined,
        title: '',
        view: '',
      },
    }
  },
  computed: {
    ...mapState(['pendapatanprofil']),
  },
  methods: {
    openDialog(edit = false, data = {}) {
      if (edit) {
        this.edit = true
        this.submit = data
      } else {
        this.edit = false
        this.submit = {
          id_pendapatan_profil: undefined,
          title: '',
          view: '',
        }
      }
      this.dialog = true
    },
    async deleteItem(id) {
      try {
        await this.$store.dispatch('pendapatanprofil/deleteProfil', id)

        this.$alert('success', 'Sukses menghapus data')
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
  head() {
    return {
      title: 'Kelola Pendapatan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Kelola Pendapatan',
        },
      ],
    }
  },
}
</script>
