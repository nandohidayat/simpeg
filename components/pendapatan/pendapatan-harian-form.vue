<template>
  <v-row>
    <v-col cols="6">
      <v-menu
        ref="menu1"
        v-model="menu1"
        :close-on-content-click="false"
        :return-value.sync="data.tgl"
        offset-x
        max-width="290px"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="data.tgl"
            v-on="on"
            label="Tanggal"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="data.tgl"
          @input="menu1 = false"
          no-title
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
      default: undefined
    }
  },
  data() {
    return {
      menu1: false
    }
  }
}
</script>

<style scoped></style>
