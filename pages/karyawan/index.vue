<template>
  <v-container>
    <v-card class="px-4">
      <v-row>
        <v-col cols="5">
          <v-text-field
            v-model="search.nama"
            label="NIK / Nama Karyawan"
            dense
            clearable
            class="mt-4"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="search.kelamin"
            :items="kelamin"
            label="Jenis Kelamin"
            dense
            clearable
            class="mt-4"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="search.departemen"
            :items="departemen.departemens"
            label="Departemen"
            dense
            clearable
            class="mt-4"
          ></v-select>
        </v-col>
        <v-col cols="1" class="d-flex align-center">
          <v-divider vertical></v-divider>
          <v-spacer></v-spacer>
          <karyawan-form> </karyawan-form>
        </v-col>
      </v-row>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="karyawan.karyawans"
      :items-per-page="20"
      :search="search.nama"
      class="elevation-2 mt-3"
    >
      <template v-slot:item.dept="{ item }">
        Utama:
        <div v-for="(d, i) in item.dept" :key="i">- {{ d }}</div>
        Sub:
      </template>
      <template v-slot:item.action="{ item }">
        <nuxt-link :to="`/karyawan/${item.nik}`">
          <v-icon>
            mdi-arrow-right
          </v-icon>
        </nuxt-link>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import karyawanForm from '@/components/karyawan/karyawan-form'

export default {
  components: {
    'karyawan-form': karyawanForm,
  },
  async fetch({ store }) {
    try {
      await Promise.all([
        store.dispatch('departemen/fetchDepartemens', { select: 1 }),
        // store.dispatch('ruang/fetchRuangs'),
        store.dispatch('karyawan/fetchKaryawans'),
      ])
    } catch (err) {
      store.dispatch('notification/addError', err)
    }
  },
  data() {
    return {
      // search: { nama: undefined, departemen: undefined, ruang: undefined },
      search: { nama: undefined, kelamin: undefined, departemen: undefined },
      kelamin: ['P', 'L'],
      headers: [
        {
          text: 'NIK',
          value: 'nik',
          width: '100px',
        },
        {
          text: 'Nama',
          value: 'nama',
        },
        {
          text: 'Jenis Kelamin',
          value: 'sex',
          width: '150px',
          filter: (value) => {
            if (!this.search.kelamin) return true

            return value === this.search.kelamin
          },
        },
        {
          text: 'Department',
          value: 'dept',
          width: '450px',
          filter: (value) => {
            if (!this.search.departemen) return true

            return value.includes(this.search.departemen)
          },
        },
        { text: 'Detail', value: 'action', sortable: false, width: '80px' },
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
