<template>
  <v-container>
    <v-card elevation="5">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4" sm="8">
            <v-text-field
              v-model="search.nama"
              outlined
              label="NIK / Nama Karyawan"
              dense
              clearable
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-select
              v-model="search.kelamin"
              :items="kelamin"
              label="Jenis Kelamin"
              dense
              clearable
              outlined
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="4" sm="8">
            <v-autocomplete
              v-model="search.departemen"
              :items="departemen.departemens"
              label="Departemen"
              dense
              outlined
              clearable
              hide-details
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="2" sm="4">
            <v-select
              v-model="search.status"
              :items="status"
              label="Status"
              dense
              clearable
              outlined
              hide-details
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="karyawan.karyawans"
      :items-per-page="20"
      :search="search.nama"
      class="elevation-5 mt-5"
      multi-sort
    >
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch({ store }) {
    try {
      await Promise.all([
        store.dispatch('departemen/fetchDepartemens', { select: 1 }),
        store.dispatch('karyawan/fetchKaryawans'),
      ])
    } catch (err) {
      store.dispatch('notification/addError', err)
    }
  },
  data() {
    return {
      // search: { nama: undefined, departemen: undefined, ruang: undefined },
      search: {
        nama: undefined,
        kelamin: undefined,
        departemen: undefined,
        status: undefined,
      },
      kelamin: ['P', 'L'],
      status: ['Active', 'Non Active'],
      headers: [
        {
          text: 'NIK',
          value: 'nik',
        },
        {
          text: 'Nama',
          value: 'nama',
        },
        {
          text: 'Jenis Kelamin',
          value: 'kelamin',
          filter: (value) => {
            if (!this.search.kelamin) return true

            return value === this.search.kelamin
          },
        },
        {
          text: 'Department',
          value: 'dept',
          filter: (value) => {
            if (!this.search.departemen) return true
            if (value) {
              return value.includes(this.search.departemen)
            }
            return false
          },
        },
        {
          text: 'Status',
          value: 'status',
          filter: (value) => {
            if (!this.search.status) return true

            return value.includes(this.search.status)
          },
        },
      ],
    }
  },

  computed: {
    ...mapState(['departemen', 'ruang', 'karyawan']),
  },

  head() {
    return {
      title: 'Daftar Karyawan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Daftar Karyawan',
        },
      ],
    }
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
