<template>
  <v-dialog
    v-model="dialog"
    width="700"
    @click:outside="$emit('update:dialog', false)"
  >
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
                    v-model="realLabel"
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
                    v-model="realPermission"
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
        <a-button class="sim" @click="() => savePermission()">Simpan</a-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    idGroup: {
      type: [Number, String],
      default: undefined,
    },
    label: {
      type: String,
      default: '',
    },
    permission: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
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
            {
              name: 'Setup',
              id: 'D3',
              children: [
                {
                  name: 'Kelola Departemen',
                  id: 16,
                },
              ],
            },
          ],
        },
      ],
    }
  },
  computed: {
    realLabel: {
      get() {
        return this.label
      },
      set(val) {
        this.$emit('update:label', val)
      },
    },
    realPermission: {
      get() {
        return this.permission
      },
      set(val) {
        this.$emit('update:permission', val)
      },
    },
  },
  methods: {
    async savePermission() {
      const submit = {
        id_group: this.idGroup,
        label: this.label,
        permission: this.permission,
      }

      try {
        await this.$store.dispatch(
          `group/${this.edit ? 'update' : 'create'}Group`,
          submit
        )
        this.$emit('update:dialog', false)

        this.$alert('success', 'Sukses Menyimpan Data')
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
}
</script>
