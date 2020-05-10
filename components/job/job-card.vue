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
    <job-form :data="data"></job-form>
  </base-table>
</template>

<script>
import BaseTable from '@/components/base/base-table'
import JobForm from '@/components/job/job-form'

export default {
  components: {
    BaseTable,
    JobForm
  },
  data() {
    return {
      title: 'Job',
      header: [
        {
          text: 'Color',
          value: 'color'
        },
        {
          text: 'Ket',
          value: 'keterangan'
        }
      ],
      store: 'job',
      state: 'jobs',
      action: 'Job',
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
        color: undefined,
        keterangan: undefined
      }
    }
  }
}
</script>

<style scoped></style>
