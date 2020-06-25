<template>
  <v-row align="center" justify="center">
    <v-col cols="12" class="text-center">
      <h1 class="display-4 mb-4">{{ statusCode }}</h1>
      <h1 class="text-uppercase font-weight-regular mb-5">{{ message }}</h1>

      <NuxtLink v-if="statusCode === 404" to="/">
        <v-btn rounded dark color="grey">
          home page
        </v-btn>
      </NuxtLink>
      <v-btn v-else rounded dark color="grey" @click="() => this.$router.go()">
        refresh
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'blank-center',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message
    },
  },
  head() {
    return { title: this.message }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}

a {
  text-decoration: none;
}
</style>
