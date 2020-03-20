<template>
  <v-app dark>
    <v-content>
      <v-container class="fill-height" fluid>
        <nuxt />
      </v-container>
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
          content: 'Penjadwalan Karyawan'
        }
      ]
    }
  }
}
</script>
