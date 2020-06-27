<template>
  <v-app dark>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      titleTemplate: '%s - SIMPEG',
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
