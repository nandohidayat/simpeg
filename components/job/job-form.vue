<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="data['color']" label="Color"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="data['keterangan']"
          label="Keterangan"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: undefined,
    },
  },
}
</script>
