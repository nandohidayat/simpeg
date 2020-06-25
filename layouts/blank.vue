<template>
  <v-app dark>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: '%s - Schedule Manager',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Penjadwalan Karyawan',
        },
      ],
    }
  },
}
</script>
