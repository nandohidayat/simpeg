<template>
  <v-breadcrumbs :items="bread" class="pt-0"></v-breadcrumbs>
</template>

<script>
export default {
  data() {
    return {
      bread: [
        {
          text: 'Home',
          to: '/',
        },
        {
          text: 'Database',
          to: '/data',
          exact: true,
        },
        {
          text: 'Setup',
          disabled: true,
        },
        {
          text: 'Kelola Departemen',
          disabled: true,
        },
      ],
    }
  },
}
</script>
