<template>
  <v-app dark>
    <v-main>
      <v-container
        fluid
        style="min-height: 100vh"
        class="d-flex teal lighten-4"
      >
        <nuxt />
      </v-container>
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
