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
            <template v-slot:item.action>
              <a-button size="small" class="mr-1 sim">Edit Data</a-button>
              <a-button size="small" type="danger">Hapus</a-button>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
          value: 'group',
        },
        {
          text: 'Actions',
          value: 'action',
        },
      ],
      search: undefined,
    }
  },
  computed: {
    ...mapState(['akses']),
  },
  methods: {
    openDialog() {},
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
