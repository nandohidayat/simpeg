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
            v-model="search.departemen"
            :items="departemen.departemens"
            :item-text="(obj) => obj.departemen"
            :item-value="(obj) => obj.departemen"
            label="Departemen"
            dense
            clearable
            class="mt-4"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="search.ruang"
            :items="ruang.ruangs"
            :item-text="(obj) => obj.ruang"
            :item-value="(obj) => obj.ruang"
            label="Ruang"
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
      :loading="loading"
      class="elevation-2 mt-3"
    >
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
  head() {
    return {
      title: 'Daftar Karyawan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Daftar Karyawan'
        }
      ]
    }
  },
  components: {
    'karyawan-form': karyawanForm
  },
  data() {
    return {
      loading: false,
      search: { nama: undefined, departemen: undefined, ruang: undefined },
      headers: [
        {
          text: 'NIK',
          value: 'nik',
          width: '100px'
        },
        { text: 'Nama', value: 'nama', align: 'start' },
        {
          text: 'Departemen',
          value: 'departemen',
          filter: (value) => {
            if (!this.search.departemen) return true

            return value === this.search.departemen
          }
        },
        {
          text: 'Ruang',
          value: 'ruang',
          filter: (value) => {
            if (!this.search.ruang) return true

            return value === this.search.ruang
          }
        },
        { text: 'Detail', value: 'action', sortable: false, width: '80px' }
      ]
    }
  },
  computed: {
    ...mapState(['departemen', 'ruang', 'karyawan'])
  },
  async fetch({ store }) {
    try {
      await Promise.all([
        store.dispatch('departemen/fetchDepartemens'),
        store.dispatch('ruang/fetchRuangs'),
        store.dispatch('karyawan/fetchKaryawans')
      ])
    } catch (err) {
      store.dispatch('notification/addError', err)
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
