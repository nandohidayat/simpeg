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
    <shift-form :data="data"></shift-form>
  </base-table>
</template>

<script>
import baseTable from '@/components/base/base-table'
import shiftForm from '@/components/shift/shift-form'

export default {
  components: {
    'base-table': baseTable,
    'shift-form': shiftForm,
  },
  data() {
    return {
      title: 'Shift',
      header: [
        {
          text: 'Mulai',
          value: 'mulai',
        },
        {
          text: 'Selesai',
          value: 'selesai',
        },
        {
          text: 'Kode',
          value: 'kode',
        },
        {
          text: 'Color',
          value: 'color',
        },
        {
          text: 'Ket',
          value: 'keterangan',
        },
      ],
      store: 'shift',
      state: 'shifts',
      action: 'Shift',
      data: this.newData(),
    }
  },
  methods: {
    reset() {
      this.data = this.newData()
    },
    newData() {
      return {
        mulai: undefined,
        selesai: undefined,
        kode: undefined,
        color: undefined,
        keterangan: undefined,
      }
    },
  },
}
</script>
