<template>
  <v-row align="center" justify="center">
    <div class="parent">
      <v-btn class="hover-color" dark>THIS</v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  layout: 'blank-center',
}
</script>

<style lang="scss" scoped>
.parent:hover .hover-color {
  background-color: #009688 !important;
}
</style>
