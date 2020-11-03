<template>
  <div>
    <group-bc></group-bc>
    <v-card>
      <v-card-text>
        <v-row no-gutters justify="center" class="mb-4">
          <v-col cols="4">
            <v-card flat outlined>
              <v-card-title class="overline py-2">Cari Group</v-card-title>
              <v-card-text>
                <a-input-search
                  v-model="search"
                  placeholder="Nama Group"
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
            :items="group.groups"
          >
            <template #item.akses="{item}">
              <div v-for="(a, i) in item.akses" :key="i">
                {{ a.menu }}
                <div v-for="(aa, idx) in a.akses" :key="idx" class="ml-1">
                  - {{ aa }}
                </div>
              </div>
            </template>
            <template v-slot:item.action="{ item }">
              <a-button
                size="small"
                class="mr-1 sim"
                @click="openDialog(true, item)"
                >Edit Data</a-button
              >
              <a-popconfirm
                title="Anda yakin akan menghapus data ini?"
                @confirm="deleteGroup(item.id_group)"
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
      ><v-icon small class="mr-1">mdi-plus</v-icon>tambah group</v-btn
    >
    <group-dialog
      :dialog.sync="dialog"
      :edit="edit"
      :id-group="submit.id_group"
      :label.sync="submit.label"
      :permission.sync="submit.permission"
    ></group-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GroupDialog from '@/components/group/group-dialog'
import GroupBc from '@/components/group/group-bc'

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](13)) {
      return redirect('/404')
    }
  },
  components: {
    GroupDialog,
    GroupBc,
  },
  async fetch({ store }) {
    await store.dispatch('group/fetchGroups')
  },
  data() {
    return {
      columns: [
        {
          text: 'Nama Group',
          value: 'label',
          align: 'start',
        },
        {
          text: 'Permission',
          value: 'akses',
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
        id_group: undefined,
        label: '',
        permission: [],
      },
    }
  },
  computed: {
    ...mapState(['group']),
  },
  methods: {
    openDialog(edit = false, data = {}) {
      if (edit) {
        this.edit = true
        this.submit = data
      } else {
        this.edit = false
        this.submit = {
          id_group: undefined,
          label: '',
          permission: [],
        }
      }
      this.dialog = true
    },
    async deleteGroup(id) {
      try {
        await this.$store.dispatch('group/deleteGroup', id)

        this.$alert('success', 'Sukses menghapus data')
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
  head() {
    return {
      title: 'Data Akses Group',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Data Akses Group',
        },
      ],
    }
  },
}
</script>
