<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn v-if="editing" text icon color="teal" v-on="on"
        ><v-icon>mdi-pencil</v-icon></v-btn
      >
      <v-btn v-else color="teal" dark small v-on="on"
        ><v-icon>mdi-plus</v-icon></v-btn
      >
    </template>
    <v-card>
      <v-card-title
        >{{ editing ? 'Data' : 'Pendaftaran' }} Karyawan</v-card-title
      >
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
        <v-btn color="teal" dark small @click="createKaryawan">
          <span>{{ editing ? 'Update' : 'Create' }}</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
    karyawan: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      dialog: false,
      newKaryawan: this.defaultKaryawan(),
    }
  },
  computed: {
    ...mapState(['departemen', 'ruang']),
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
  },
  methods: {
    defaultKaryawan() {
      return {
        nik: this.karyawan ? this.karyawan.nik : undefined,
        nama: this.karyawan ? this.karyawan.nama : undefined,
        id_departemen: this.karyawan ? this.karyawan.id_departemen : undefined,
        id_ruang: this.karyawan ? this.karyawan.id_ruang : undefined,
      }
    },
    close() {
      this.dialog = false
      this.newKaryawan = this.defaultKaryawan()
    },
    async createKaryawan() {
      const editing = this.editing
        ? 'karyawan/updateKaryawan'
        : 'karyawan/createKaryawan'

      try {
        await this.$store.dispatch(editing, this.newKaryawan)
        this.close()
      } catch (err) {
        this.$store.dispatch('notification/addError', err)
      }
    },
  },
}
</script>
