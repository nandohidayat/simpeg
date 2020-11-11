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
          text: 'User Akses',
          to: '/data/akses',
          exact: true,
        },
        {
          text: 'Group',
          disabled: true,
        },
      ],
    }
  },
}
</script>
