<template>
  <v-row
    justify="center"
    align="center"
    style="min-height: 100vh;"
    class="maintenance"
  >
    <v-col cols="6" class="text-center">
      <div class="display-2">maintenance</div>
      <div class="title">please be patien</div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'blank',
  auth: false,
  head() {
    return {
      title: 'Maintenance',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Maintenance',
        },
      ],
    }
  },
}
</script>

<style scoped>
.maintenance {
  background: rgb(164, 219, 214);
  background: linear-gradient(
    141deg,
    rgba(164, 219, 214, 1) 0%,
    rgba(216, 236, 234, 1) 100%
  );
}
</style>
