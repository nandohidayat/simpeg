<template>
  <base-table
    :header="header"
    :title="title"
    :store="store"
    :state="state"
    :action="action"
    :data="data"
    @reset="reset()"
    @edit="edit"
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
    'shift-form': shiftForm
  },
  data() {
    return {
      title: 'Shift',
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
      store: 'shift',
      state: 'shifts',
      action: 'Shift',
      data: this.newData()
    }
  },
  methods: {
    edit(data) {
      this.data = data
    },
    reset() {
      this.data = this.newData()
    },
    newData() {
      return {
        mulai: undefined,
        selesai: undefined,
        kode: undefined,
        keterangan: undefined
      }
    }
  }
}
</script>

<style scoped></style>
