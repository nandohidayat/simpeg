<template>
  <base-table
    :header="header"
    :title="title"
    :store="store"
    :state="state"
    :action="action"
    :data.sync="data"
    @reset="reset()"
  >
    <pendapatan-form :data="data"></pendapatan-form>
  </base-table>
</template>

<script>
import baseTable from '@/components/base/base-table'
import pendapatanForm from '@/components/pendapatan/pendapatan-harian-form'

export default {
  components: {
    'base-table': baseTable,
    'pendapatan-form': pendapatanForm
  },
  data() {
    return {
      title: 'Pendapatan Harian',
      header: [
        {
          text: 'Tanggal',
          value: 'tgl'
        },
        {
          text: 'Pendapatan',
          value: 'pendapatan'
        }
      ],
      store: 'pendapatanharian',
      state: 'pendapatans',
      action: 'Pendapatan',
      data: this.newData()
    }
  },
  methods: {
    reset() {
      this.data = this.newData()
    },
    newData() {
      return {
        tgl: undefined,
        pendapatan: undefined
      }
    }
  }
}
</script>

<style scoped></style>
