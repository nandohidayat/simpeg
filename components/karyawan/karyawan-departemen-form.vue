<template>
  <base-form
    v-model="dialog"
    title="Mutasi Departemen"
    store="logdepartemen"
    action="Log"
    :data="newData"
    :edit="edit"
  >
    <v-autocomplete
      v-model="newData.dept"
      dense
      outlined
      :item-text="(o) => o.nm_dept"
      :item-value="(o) => o.id_dept"
      :items="departemen.departemens"
      label="Departemen"
    ></v-autocomplete>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="newData.masuk"
          outlined
          dense
          label="Masuk"
          v-bind="attrs"
          clearable
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="newData.masuk"
        no-title
        color="teal"
        @input="menu = false"
      ></v-date-picker>
    </v-menu>
    <v-menu
      ref="menu1"
      v-model="menu1"
      :close-on-content-click="false"
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="newData.keluar"
          outlined
          dense
          label="Keluar"
          v-bind="attrs"
          clearable
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="newData.keluar"
        no-title
        color="teal"
        @input="menu1 = false"
      ></v-date-picker>
    </v-menu>
  </base-form>
</template>

<script>
import { mapState } from 'vuex'
import BaseForm from '@/components/base/base-form'

export default {
  components: {
    BaseForm,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      newData: {
        id_log_departemen: undefined,
        pegawai: undefined,
        dept: undefined,
        masuk: undefined,
        keluar: undefined,
      },
      menu: false,
      menu1: false,
    }
  },
  computed: {
    ...mapState(['departemen']),
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.newData.id_log_departemen = this.data.id_log_departemen
        this.newData.pegawai = this.data.pegawai
        this.newData.dept = this.data.id_dept
        this.newData.masuk = this.data.masuk
        this.newData.keluar = this.data.keluar
      }
    },
  },
}
</script>
