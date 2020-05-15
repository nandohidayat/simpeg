<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          :offset-x="true"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="data['mulai']"
              v-on="on"
              label="Mulai"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu1"
            v-model="data['mulai']"
            @click:minute="$refs.menu1.save(data['mulai'])"
            format="24hr"
          ></v-time-picker>
        </v-menu>
      </v-col>
      <v-col cols="6">
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :offset-x="true"
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="data['selesai']"
              v-on="on"
              label="Selesai"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="data['selesai']"
            @click:minute="$refs.menu2.save(data['selesai'])"
            format="24hr"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="data['kode']" label="Kode"></v-text-field>
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
      default: undefined
    }
  },
  data() {
    return {
      menu1: false,
      menu2: false
    }
  }
}
</script>

<style scoped></style>
