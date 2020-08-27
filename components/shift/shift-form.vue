<template>
  <base-form
    v-model="dialog"
    title="Shift"
    store="shift"
    action="Shift"
    :data="newData"
    :edit="edit"
  >
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
              v-model="newData.mulai"
              label="Mulai"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu1"
            v-model="newData.mulai"
            format="24hr"
            @click:minute="$refs.menu1.save(newData.mulai)"
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
              v-model="newData.selesai"
              label="Selesai"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="newData.selesai"
            format="24hr"
            @click:minute="$refs.menu2.save(newData.selesai)"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="newData.kode" label="Kode"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="newData.color" label="Color"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="newData.keterangan"
          label="Keterangan"
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
        id_shift: undefined,
        mulai: undefined,
        selesai: undefined,
        kode: undefined,
        color: undefined,
        keterangan: undefined,
      },
      menu1: false,
      menu2: false,
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
        this.newData.id_shift = this.data.id_shift
        this.newData.mulai = this.data.mulai
        this.newData.selesai = this.data.selesai
        this.newData.kode = this.data.kode
        this.newData.color = this.data.color
        this.newData.keterangan = this.data.keterangan
      }
    },
  },
}
</script>
