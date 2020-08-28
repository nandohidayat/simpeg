<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="grey lighten-5">
        <span class="text-capitalize"
          >{{ edit ? 'Edit' : 'Tambah' }} {{ title }}</span
        >
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="disabled" color="teal" dark @click="createData()"
          ><v-icon left>mdi-content-save</v-icon> Simpan</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    store: {
      type: String,
      default: undefined,
    },
    action: {
      type: String,
      default: undefined,
    },
    data: {
      type: Object,
      default: undefined,
    },
    edit: {
      type: Boolean,
      default: undefined,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      disabled: false,
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
  methods: {
    async createData() {
      this.disabled = true

      const url = `${this.store}/${this.edit ? 'update' : 'create'}${
        this.action
      }`

      try {
        await this.$store.dispatch(url, this.data)

        this.$alert('success', 'Successfully Saved')
      } catch (err) {
        this.$alert('error', err)
      } finally {
        this.disabled = false
        this.dialog = false
      }
    },
  },
}
</script>
