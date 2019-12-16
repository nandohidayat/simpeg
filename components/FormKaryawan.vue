<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="edited" v-on="on" text icon color="teal"
        ><v-icon>mdi-pencil</v-icon></v-btn
      >
      <v-btn v-else v-on="on" color="teal" dark small
        ><v-icon>mdi-plus</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-card-title v-if="edited">
        Data Karyawan
      </v-card-title>
      <v-card-title v-else>
        Pendaftaran Karyawan
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="newKaryawan.nik"
              label="NIK"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="9">
            <v-text-field
              v-model="newKaryawan.nama"
              label="Nama"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="newKaryawan.id_departemen"
              :items="departemen.departemens"
              :item-text="(obj) => obj.departemen"
              :item-value="(obj) => obj.id_departemen"
              label="Departemen"
              dense
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="newKaryawan.id_ruang"
              :items="ruang.ruangs"
              :item-text="(obj) => obj.ruang"
              :item-value="(obj) => obj.id_ruang"
              label="Ruang"
              dense
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="createKaryawan" color="teal" dark small>
          <span v-if="edited">Update</span>
          <span v-else>Create</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    edited: {
      type: Boolean,
      default: false
    },
    karyawan: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialog: false,
      newKaryawan: this.defaultKaryawan()
    }
  },
  computed: {
    ...mapState(['departemen', 'ruang'])
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  methods: {
    defaultKaryawan() {
      return {
        nik: this.karyawan ? this.karyawan.nik : undefined,
        nama: this.karyawan ? this.karyawan.nama : undefined,
        id_departemen: this.karyawan ? this.karyawan.id_departemen : undefined,
        id_ruang: this.karyawan ? this.karyawan.id_ruang : undefined
      }
    },
    close() {
      this.dialog = false
      this.newKaryawan = this.defaultKaryawan()
    },
    async createKaryawan() {
      try {
        if (this.edited) {
          await this.$store.dispatch(
            'karyawan/updateKaryawan',
            this.newKaryawan
          )
        } else {
          await this.$store.dispatch(
            'karyawan/createKaryawan',
            this.newKaryawan
          )
        }
        this.close()
      } catch (err) {
        this.$store.dispatch('notification/addError', err)
      }
    }
  }
}
</script>

<style scoped></style>
