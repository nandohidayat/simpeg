<template>
  <base-table
    :header="header"
    :title="title"
    #default="{newdata}"
    namespace="pendapatanharian"
    list="pendapatan"
  >
    <pendapatan-form :newdata="newdata"></pendapatan-form>
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
      title: 'Pendapatan Harian'
    }
  }
}
</script>

<style scoped></style>
