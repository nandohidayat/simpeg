<template>
  <div>
    <v-breadcrumbs :items="bread" class="pt-0"></v-breadcrumbs>
    <v-card>
      <v-card-text>
        <v-row no-gutters justify="center" class="mb-4">
          <v-col cols="4">
            <v-card flat outlined>
              <v-card-title class="overline py-2">Cari User</v-card-title>
              <v-card-text>
                <a-input-search
                  v-model="search"
                  placeholder="Name / Username"
                  allow-clear
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card flat outlined>
          <v-data-table
            :headers="columns"
            :items="akses.aksess"
            item-key="username"
            :search="search"
            calculate-widths
          >
            <template v-slot:item.action="{ item }">
              <a-button
                size="small"
                class="mr-1 sim"
                @click="() => openDialog(true, item)"
                >Edit Data</a-button
              >
              <a-popconfirm
                title="Anda yakin akan menghapus data ini?"
                @confirm="deleteAkses(item.id_pegawai)"
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
      ><v-icon small class="mr-1">mdi-plus</v-icon>tambah user</v-btn
    >
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-title>{{ edit ? 'Edit' : 'Tambah' }} User</v-card-title>
        <v-card-text class="py-3">
          <v-card outlined flat>
            <v-simple-table>
              <tbody>
                <tr>
                  <td>
                    Karyawan
                  </td>
                  <td>
                    <a-select
                      v-model="submit.id_pegawai"
                      :disabled="edit"
                      style="width: 100%;"
                      show-search
                      placeholder="Nama Karyawan"
                      option-filter-prop="label"
                      :options="optionKaryawan"
                      :filter-option="filterOption"
                    ></a-select>
                  </td>
                </tr>
                <tr>
                  <td>Username</td>
                  <td>
                    <a-input
                      v-model="submit.username"
                      placeholder="Username"
                    ></a-input>
                  </td>
                </tr>
                <tr>
                  <td>
                    Password
                  </td>
                  <td>
                    <a-input
                      v-model="submit.password"
                      placeholder="Password"
                      type="password"
                    ></a-input>
                  </td>
                </tr>
                <tr>
                  <td>
                    Confirm Password
                  </td>
                  <td>
                    <a-input
                      v-model="submit.confirm"
                      placeholder="Confirm Password"
                      type="password"
                    ></a-input>
                  </td>
                </tr>
                <tr>
                  <td>
                    Group
                  </td>
                  <td>
                    <a-select
                      v-model="submit.id_group"
                      style="width: 100%;"
                      show-search
                      placeholder="Group"
                      option-filter-prop="label"
                      :options="optionGroup"
                      :filter-option="filterOption"
                    ></a-select>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <a-button class="sim" @click="() => saveAkses()">Simpan</a-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](4)) {
      return redirect('/404')
    }
  },
  async fetch({ store }) {
    await store.dispatch('akses/fetchAksess')
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
          disabled: true,
        },
      ],
      columns: [
        {
          text: 'Nama',
          value: 'nama',
        },
        {
          text: 'Username',
          value: 'username',
        },
        {
          text: 'Group',
          value: 'label',
        },
        {
          text: 'Actions',
          value: 'action',
        },
      ],
      search: undefined,
      edit: false,
      dialog: false,
      submit: {
        id_pegawai: undefined,
        username: undefined,
        password: undefined,
        confirm: undefined,
        id_group: undefined,
      },
    }
  },
  computed: {
    ...mapState(['akses', 'karyawan', 'group']),
    optionKaryawan() {
      if (this.edit) {
        return [{ label: this.submit.nama, value: this.submit.id_pegawai }]
      } else {
        return this.karyawan.karyawans
      }
    },
    optionGroup() {
      if (this.group.groups.length > 0 && this.group.groups[0].label) {
        return this.group.groups
      } else {
        return []
      }
    },
  },
  methods: {
    async openDialog(edit = false, data = {}) {
      const actions = [
        this.$store.dispatch('group/fetchGroups', {
          select: 1,
          for: 'ant',
          user: 1,
        }),
      ]

      if (edit) {
        this.submit = { ...this.submit, ...data }
      } else {
        this.submit = {
          id_pegawai: undefined,
          username: undefined,
          password: undefined,
          confirm: undefined,
          id_group: undefined,
        }

        actions.push(
          this.$store.dispatch('karyawan/fetchKaryawans', {
            select: 1,
            for: 'ant',
          })
        )
      }

      this.edit = edit

      try {
        await Promise.all(actions)
        this.dialog = true
      } catch (e) {
        this.$alert('error', e)
      }
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
    async saveAkses() {
      try {
        await this.$store.dispatch(
          `akses/${this.edit ? 'update' : 'create'}Akses`,
          this.submit
        )
        this.dialog = false

        this.$alert('success', 'Sukses Menyimpan Data')
      } catch (e) {
        this.$alert('error', e)
      }
    },
    async deleteAkses(id) {
      try {
        await this.$store.dispatch('akses/deleteAkses', id)

        this.$alert('success', 'Sukses menghapus data')
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
  head() {
    return {
      title: 'Data Akses',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Data Akses',
        },
      ],
    }
  },
}
</script>
