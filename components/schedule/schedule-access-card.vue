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
    <schedule-form :data="data"></schedule-form>
  </base-table>
</template>

<script>
import baseTable from '@/components/base/base-table'
import scheduleForm from '@/components/schedule/schedule-access-form'

export default {
  components: {
    'base-table': baseTable,
    'schedule-form': scheduleForm
  },
  data() {
    return {
      title: 'Schedule Access',
      header: [
        {
          text: 'Departemen',
          value: 'nm_dept'
        },
        {
          text: 'Access',
          value: 'nm_acc'
        },
        {
          text: 'Assessor',
          value: 'assessor'
        }
      ],
      store: 'scheduleaccess',
      state: 'schedules',
      action: 'Schedule',
      data: this.newData()
    }
  },
  methods: {
    reset() {
      this.data = this.newData()
    },
    newData() {
      return {
        dept: undefined,
        access: undefined,
        assessor: false
      }
    }
  }
}
</script>

<style scoped></style>
