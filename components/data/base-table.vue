<template>
  <v-card class="mt-5">
    <v-toolbar flat color="teal" dark>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-data-table :items="ruang.ruangs">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Data Ruang</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <FormBagian label="Ruang"></FormBagian>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <FormBagian :editData="item" :edit="true" label="Ruang"></FormBagian>
          <v-icon @click="deleteData('ruang', item.id_ruang)" small>
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
