<template>
  <base-form
    v-model="dialog"
    title="Pendapatan Harian"
    store="pendapatanharian"
    action="Pendapatan"
    :data="newData"
    :edit="edit"
  >
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
              v-model="newData.tgl"
              label="Tanggal"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="newData.tgl"
            no-title
            color="teal"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="newData.pendapatan"
          label="Pendapatan"
        ></v-text-field>
      </v-col>
    </v-row>
  </base-form>
</template>

<script>
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
        id_pendapatan_harian: undefined,
        tgl: undefined,
        pendapatan: undefined,
      },
      menu: false,
    }
  },
  computed: {
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
        this.newData.id_pendapatan_harian = this.data.id_pendapatan_harian
        this.newData.tgl = this.data.tgl
        this.newData.pendapatan = this.data.pendapatan
      }
    },
  },
}
</script>
