<template>
  <v-btn
    :ripple="false"
    height="35"
    width="200"
    depressed
    small
    tile
    color="white"
  >
    <span class="d-inline-block text-truncate text-left" style="width: 180px;">
      {{ value }}
    </span>
  </v-btn>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style scoped></style>
