<template>
  <base-table :header="header" :title="title" #default="{newdata}">
    <shift-form :newdata="newdata"></shift-form>
  </base-table>
</template>

<script>
import baseTable from '@/components/base/base-table'
import shiftForm from '@/components/shift/shift-form'

export default {
  components: {
    'base-table': baseTable,
    'shift-form': shiftForm
  },
  data() {
    return {
      header: [
        {
          text: 'Mulai',
          value: 'mulai'
        },
        {
          text: 'Selesai',
          value: 'selesai'
        },
        {
          text: 'Kode',
          value: 'kode'
        },
        {
          text: 'Ket',
          value: 'keterangan'
        }
      ],
      title: 'Shift'
    }
  }
}
</script>

<style scoped></style>
