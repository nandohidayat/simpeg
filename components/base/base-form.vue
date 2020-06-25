<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-icon v-if="edit" small class="mr-2" v-on="on">
        mdi-pencil
      </v-icon>
      <v-btn v-else icon v-on="on">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-capitalize"
          >{{ edit ? 'Edit' : 'Buat' }} {{ title }}</span
        >
      </v-card-title>
      <v-card-text>
        <slot></slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="disabled"
          color="teal"
          small
          dark
          @click="createData()"
          ><v-icon>mdi-content-save</v-icon></v-btn
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
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      dialog: false,
      disabled: false,
    }
  },
  watch: {
    dialog(val) {
      if (val && this.edit !== undefined) {
        this.$emit('edit', this.edit)
      }
      if (!val) {
        this.$emit('reset')
      }
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

        this.dialog = false

        this.$alert('success', 'Successfully Saved')
      } catch (err) {
        this.$alert('error', err)
      } finally {
        this.disabled = false
      }
    },
  },
}
</script>
