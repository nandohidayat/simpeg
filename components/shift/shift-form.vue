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
              v-model="newdata['mulai']"
              v-on="on"
              label="Mulai"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu1"
            v-model="newdata['mulai']"
            @click:minute="$refs.menu1.save(newdata['mulai'])"
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
              v-model="newdata['selesai']"
              v-on="on"
              label="Selesai"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="newdata['selesai']"
            @click:minute="$refs.menu2.save(newdata['selesai'])"
            format="24hr"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="newdata['kode']" label="Kode"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="newdata['keterangan']"
          label="Keterangan"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    newdata: {
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
