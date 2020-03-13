<template>
  <base-table
    :header="header"
    title="Asessor Penjadwalan"
    namespace="scheduleassessor"
    items="schedule"
  ></base-table>
</template>

<script>
import baseTable from '@/components/base/base-table'

export default {
  components: {
    'base-table': baseTable
  },
  data() {
    return {
      header: [
        {
          text: 'Department',
          value: 'department'
        },
        {
          text: 'Assessor',
          value: 'assessor'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
