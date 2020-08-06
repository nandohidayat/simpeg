<template>
  <v-card class="pa-4">
    <v-tabs v-model="tab" color="teal">
      <v-tab><v-icon left>mdi-account-outline</v-icon>Account</v-tab>
      <v-tab><v-icon left>mdi-information-outline</v-icon>Information</v-tab>
      <v-tab><v-icon left>mdi-share-variant-outline</v-icon>Disposition</v-tab>
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
              <v-btn color="teal" dark depressed>Change Avatar</v-btn>
              <v-btn color="teal" outlined class="ml-3" depressed
                >Remove Avatar</v-btn
              >
            </div>
          </div>
          <v-row class="mt-5">
            <v-col cols="6">
              <v-text-field
                label="NIK"
                :value="karyawan.karyawan.nik"
                outlined
                dense
              >
              </v-text-field>
              <v-text-field
                class="mt-1"
                label="Nama"
                :value="karyawan.karyawan.nama"
                outlined
                dense
              >
              </v-text-field>
              <v-text-field
                class="mt-1"
                label="Username"
                :value="karyawan.karyawan.username"
                outlined
                dense
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                label="Status"
                :items="status"
                outlined
                dense
                :value="karyawan.karyawan.status"
              ></v-select>
              <v-text-field
                class="mt-1"
                label="Email"
                :value="karyawan.karyawan.email"
                outlined
                dense
              >
              </v-text-field>
              <v-btn
                block
                color="teal"
                dark
                class="mt-1"
                depressed
                @click="dialog = true"
                >Reset Password</v-btn
              >
            </v-col>
          </v-row>
          <div class="d-flex justify-space-between mb-3">
            <span class="subtitle-1 d-inline-block">Departemen</span>
            <v-btn
              color="teal"
              depressed
              dark
              class="d-inline-block"
              @click="tab = 2"
              >Edit</v-btn
            >
          </div>
          <v-sheet outlined>
            <v-data-table
              :headers="header"
              :items="tableDept"
              hide-default-footer
              hide-default-header
            ></v-data-table>
          </v-sheet>
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <v-row class="mt-3">
            <v-col cols="6">
              <v-select
                label="Jenis Kelamin"
                outlined
                :items="kelamin"
                :value="karyawan.karyawan.kelamin"
                dense
              ></v-select>
              <v-text-field
                class="mt-1"
                label="No HP"
                outlined
                :value="karyawan.karyawan.hp"
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Alamat"
                outlined
                :value="karyawan.karyawan.alamat"
                dense
              ></v-text-field>
              <v-text-field
                class="mt-1"
                label="No Rekening"
                outlined
                :value="karyawan.karyawan.rekening"
                dense
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-tab-item>
      <v-tab-item>A</v-tab-item>
    </v-tabs-items>
    <v-card-actions>
      <v-spacer> </v-spacer>
      <v-btn color="teal" dark depressed>Save Changes</v-btn>
      <v-btn
        color="warning"
        outlined
        class="ml-3"
        depressed
        :to="{ name: 'karyawan-id', params: { id: karyawan.karyawan.nik } }"
        >Cancel</v-btn
      >
    </v-card-actions>
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title class="grey lighten-5">Confirm</v-card-title>
        <v-card-text class="subtitle-1 pt-4">
          Reset password?
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal" dark depressed>Confirm</v-btn>
          <v-btn depressed @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog: false,
      status: [
        { text: 'Active', value: true },
        { text: 'Non Active', value: false },
      ],
      kelamin: [
        { text: 'Laki-laki', value: 'L' },
        { text: 'Perempuan', value: 'P' },
      ],
      header: [{ text: 'Departemen', value: 'dept' }],
    }
  },
  computed: {
    ...mapState(['karyawan']),
    tableDept() {
      return this.karyawan.karyawan.dept.map((d) => ({ dept: d }))
    },
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
