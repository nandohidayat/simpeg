<template>
  <v-card class="mt-5">
    <v-toolbar flat color="teal" dark>
      <v-toolbar-title v-text="`Data ${capitalize()}`"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-slot name="cardtext"></v-slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: undefined
    }
  },
  methods: {
    capitalize() {
      return this.data.charAt(0).toUpperCase() + this.data.slice(1)
    }
  }
}
</script>

<style scoped></style>
