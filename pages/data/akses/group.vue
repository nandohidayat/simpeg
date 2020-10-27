<template>
  <div>
    <v-breadcrumbs :items="bread" class="pt-0"></v-breadcrumbs>
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
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-title>{{ edit ? 'Edit' : 'Tambah' }} Group</v-card-title>
        <v-card-text class="py-3">
          <v-card outlined flat>
            <v-simple-table>
              <tbody>
                <tr>
                  <td>
                    Nama Group
                  </td>
                  <td>
                    <a-input
                      v-model="submit.label"
                      placeholder="Nama Group"
                    ></a-input>
                  </td>
                </tr>
                <tr>
                  <td>
                    Permission
                  </td>
                  <td>
                    <v-treeview
                      v-model="submit.permission"
                      selectable
                      :items="tree"
                      dense
                      selected-color="teal"
                    >
                    </v-treeview>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <a-button class="sim" @click="() => savePermission()"
            >Simpan</a-button
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch({ store }) {
    await store.dispatch('group/fetchGroups')
  },
  data() {
    return {
      bread: [
        {
          text: 'Home',
          to: '/',
        },
        {
          text: 'Database',
          to: '/data',
          exact: true,
        },
        {
          text: 'User Akses',
          to: '/data/akses',
          exact: true,
        },
        {
          text: 'Group',
          disabled: true,
        },
      ],
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
      tree: [
        {
          name: 'Karyawan',
          id: 'K',
          children: [
            {
              name: 'Karyawan',
              id: 'K1',
              children: [
                {
                  name: 'Daftar Karyawan',
                  id: 1,
                },
                {
                  name: 'Daftar Karyawan > Edit Karyawan',
                  id: 7,
                },
              ],
            },
            {
              name: 'Jadwal',
              id: 'K2',
              children: [
                {
                  name: 'Jadwal Karyawan',
                  id: 2,
                },
                {
                  name: 'Jadwal Karyawan > Edit Jadwal',
                  id: 5,
                },
                {
                  name: 'Jadwal Karyawan > Semua Jadwal',
                  id: 6,
                },
                {
                  name: 'Absen Karyawan',
                  id: 10,
                },
              ],
            },
            {
              name: 'Pendapatan',
              id: 'K3',
              children: [
                {
                  name: 'Pendapatan Karyawan',
                  id: 8,
                },
                {
                  name: 'Template Pendapatan',
                  id: 11,
                },
                {
                  name: 'Email Pendapatan',
                  id: 12,
                },
                {
                  name: 'Manage Template',
                  id: 9,
                },
              ],
            },
          ],
        },
        {
          name: 'Database',
          id: 'D',
          children: [
            {
              name: 'Akses',
              id: 'D1',
              children: [
                {
                  name: 'User Akses',
                  id: 4,
                },
                {
                  name: 'Group',
                  id: 13,
                },
              ],
            },
            {
              name: 'Jadwal',
              id: 'D2',
              children: [
                {
                  name: 'Data Shift',
                  id: 3,
                },
                {
                  name: 'Akses Jadwal',
                  id: 14,
                },
                {
                  name: 'Pendapatan Harian',
                  id: 15,
                },
              ],
            },
          ],
        },
      ],
      search: undefined,
      dialog: false,
      edit: false,
      submit: {
        id_group: undefined,
        label: undefined,
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
          label: undefined,
          permission: [],
        }
      }
      this.dialog = true
    },
    async savePermission() {
      try {
        await this.$store.dispatch(
          `group/${this.edit ? 'update' : 'create'}Group`,
          this.submit
        )
        this.dialog = false

        this.$alert('success', 'Sukses Menyimpan Data')
      } catch (e) {
        this.$alert('error', e)
      }
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
