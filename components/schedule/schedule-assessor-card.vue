<template>
  <base-table
    :header="header"
    :title="title"
    #default="{newdata}"
    namespace="scheduleassessor"
    list="schedule"
  >
    <schedule-form :newdata="newdata"></schedule-form>
  </base-table>
</template>

<script>
import baseTable from '@/components/base/base-table'
import scheduleForm from '@/components/schedule/schedule-assessor-form'

export default {
  components: {
    'base-table': baseTable,
    'schedule-form': scheduleForm
  },
  data() {
    return {
      header: [
        {
          text: 'Department',
          value: 'nm_dept'
        },
        {
          text: 'Assessor',
          value: 'nm_ass'
        }
      ],
      title: 'Asessor Penjadwalan'
    }
  }
}
</script>

<style scoped></style>
