<template>
  <v-card-text>
    <v-row class="mt-3">
      <v-col cols="6">
        <v-select
          v-model="data.kelamin"
          label="Jenis Kelamin"
          outlined
          :items="kelamin"
          dense
        ></v-select>
        <v-text-field
          v-model="data.hp"
          class="mt-1"
          label="No HP"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="data.alamat"
          label="Alamat"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-model="data.rekening"
          class="mt-1"
          label="No Rekening"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      kelamin: [
        { text: 'Laki-laki', value: 'L' },
        { text: 'Perempuan', value: 'P' },
      ],
    }
  },
}
</script>
