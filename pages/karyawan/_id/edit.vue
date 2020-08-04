<template>
  <v-card class="pa-4">
    <v-tabs v-model="tab" color="teal">
      <v-tab><v-icon left>mdi-account-outline</v-icon>Account</v-tab>
      <v-tab><v-icon left>mdi-information-outline</v-icon>Information</v-tab>
      <v-tab><v-icon left>mdi-share-variant-outline</v-icon>Social</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card-text class="pt-9">
          <div class="d-flex align-start">
            <v-avatar size="90" color="teal" rounded>
              <v-icon class="white--text" size="80">mdi-account-circle</v-icon>
            </v-avatar>
            <div class="ml-7 d-inline-block">
              <h3 class="font-weight-medium mb-2 mt-1">
                {{ karyawan.karyawan.nama }}
              </h3>
              <v-btn color="teal" dark>Change Avatar</v-btn>
              <v-btn color="teal" outlined class="ml-3">Remove Avatar</v-btn>
            </div>
          </div>
        </v-card-text>
      </v-tab-item>
      <v-tab-item>A</v-tab-item>
      <v-tab-item>A</v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch({ params, store, route }) {
    try {
      await store.dispatch('karyawan/fetchKaryawan', params.id)
    } catch (err) {
      route.redirect('/404')
    }
  },
  data() {
    return {
      tab: undefined,
    }
  },
  computed: {
    ...mapState(['karyawan']),
  },
  head() {
    return {
      title: `Edit ${this.karyawan.karyawan.nama}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Edit Karyawan',
        },
      ],
    }
  },
}
</script>
