<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <slot v-bind:on="on" name="btn"></slot>
    </template>
    <v-card>
      <v-card-title>
        <span>{{ editing ? 'Edit' : 'Buat' }} {{ capitalize() }}</span>
      </v-card-title>
      <v-card-text>
        <slot v-bind:newdata="newData" name="form"> </slot>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="createData()" color="teal" small dark
          ><v-icon>mdi-content-save</v-icon></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: undefined
    },
    value: {
      type: [Object, String],
      default: undefined
    }
  },
  data() {
    return {
      dialog: false,
      newData: this.dataMaker()
    }
  },
  computed: {
    editing() {
      return this.value !== undefined
    }
  },
  methods: {
    capitalize() {
      return this.data.charAt(0).toUpperCase() + this.data.slice(1)
    },
    async createData() {
      const url = `${this.data}/${
        this.editing ? 'update' : 'create'
      }${this.capitalize()}`

      try {
        await this.$store.dispatch(url, this.newData)
        this.newData = this.dataMaker()
        this.dialog = false
      } catch (err) {
        this.$store.dispatch('notification/addError', err)
      }
    },
    dataMaker() {
      if (this.value !== undefined) return { ...this.value }
      if (this.data === 'ruang') return { ruang: undefined }
      if (this.data === 'shift')
        return { mulai: undefined, selesai: undefined, kode: undefined }
    }
  }
}
</script>

<style scoped></style>
