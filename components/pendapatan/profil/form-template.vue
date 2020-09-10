<template>
  <base-form
    v-model="dialog"
    title="Profil"
    store="pendapatanprofil"
    action="Profil"
    :data="newData"
    :edit="edit"
  >
    <v-row>
      <v-col>
        <v-text-field
          v-model="newData.text"
          dense
          outlined
          label="Nama Pendapatan"
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
        value: undefined,
        text: undefined,
      },
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
        this.newData.value = this.data.value
        this.newData.text = this.data.text
      }
    },
  },
}
</script>
