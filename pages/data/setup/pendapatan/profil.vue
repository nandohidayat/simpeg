<template>
  <div>
    <pdpt-setup-profil-bc></pdpt-setup-profil-bc>
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
            dense
          >
            <template #item.column="{ item }">
              <span
                class="d-inline-block text-truncate"
                style="max-width: 150px;"
              >
                {{ item.column }}
              </span>
            </template>
            <template #item.action="{ item }">
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
      ><v-icon small class="mr-1">mdi-plus</v-icon>tambah profil</v-btn
    >
    <pdpt-setup-profil-dialog
      :dialog.sync="dialog"
      :edit="edit"
      :id-pdpt="submit.id_pendapatan_profil"
      :title.sync="submit.title"
      :view.sync="submit.view"
      :column.sync="submit.column"
      :active.sync="submit.active"
    ></pdpt-setup-profil-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import PdptSetupProfilBc from '@/components/pendapatan/pdpt-setup-profil-bc'
import PdptSetupProfilDialog from '@/components/pendapatan/pdpt-setup-profil-dialog'

export default {
  components: {
    PdptSetupProfilBc,
    PdptSetupProfilDialog,
  },
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](17)) {
      return redirect('/404')
    }
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
          cellClass: 'high-table',
        },
        {
          text: 'View',
          value: 'view',
          filterable: false,
        },
        {
          text: 'Column',
          value: 'column',
          filterable: false,
        },
        {
          text: 'Active',
          value: 'active',
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
        column: '',
        active: false,
      },
    }
  },
  head() {
    return {
      title: 'Profil Pendapatan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Profil Pendapatan',
        },
      ],
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
          column: '',
          active: false,
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
}
</script>

<style scoped>
.high-table {
  vertical-align: top;
  text-align: left;
  padding-top: 15px;
}
</style>
