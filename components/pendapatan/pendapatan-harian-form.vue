<template>
  <v-row>
    <v-col cols="6">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="data.tgl"
            label="Tanggal"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="data.tgl"
          no-title
          color="teal"
          @input="menu = false"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="6">
      <v-text-field v-model="data.pendapatan" label="Pendapatan"></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      menu: false,
    }
  },
}
</script>
