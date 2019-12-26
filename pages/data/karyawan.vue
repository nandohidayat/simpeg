<template>
  <div>
    <v-row>
      <v-col cols="6">
        <base-table :header="[]" :items="ruang.ruangs" data="ruang">
          <template v-slot:baseform="{ newdata }">
            <ruang-form :newdata="newdata"></ruang-form>
          </template>
        </base-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import baseTable from '@/components/data/base-table'
import ruangForm from '@/components/ruang/ruang-form'

export default {
  head() {
    return {
      title: 'Database Karyawan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Data Karyawan'
        }
      ]
    }
  },
  components: {
    'base-table': baseTable,
    'ruang-form': ruangForm
  },
  data() {
    return {
      headerRuang: [
        { text: 'Ruang', value: 'ruang' },
        {
          text: 'Action',
          value: 'action',
          sortable: false,
          width: '100px'
        }
      ]
    }
  },
  computed: {
    ...mapState(['ruang'])
  },
  async fetch({ store }) {
    await Promise.all([store.dispatch('ruang/fetchRuangs')])
  }
}
</script>

<style scoped></style>
