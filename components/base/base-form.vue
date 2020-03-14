<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-icon v-if="edit" v-on="on" small class="mr-2">
        mdi-pencil
      </v-icon>
      <v-btn v-else v-on="on" icon>
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
        <slot :newdata="newdata"></slot>
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
    title: {
      type: String,
      default: ''
    },
    edit: {
      type: Boolean,
      default: false
    },
    namespace: {
      type: String,
      default: undefined
    },
    item: {
      type: String,
      default: undefined
    },
    data: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      dialog: false,
      newdata: this.dataMaker()
    }
  },
  methods: {
    async createData() {
      const url = `${this.namespace}/${
        this.edit ? 'update' : 'create'
      }${this.item.charAt(0).toUpperCase() + this.item.slice(1)}`

      try {
        await this.$store.dispatch(url, this.newdata)
        this.newdata = this.dataMaker()
        this.dialog = false
        this.$store.dispatch('notification/addNotif', {
          type: 'success',
          text: 'Successfully Saved'
        })
      } catch (err) {
        this.$store.dispatch('notification/addNotif', {
          type: 'error',
          text: err
        })
      }
    },
    dataMaker() {
      if (this.data !== undefined) return this.data
      if (this.namespace === 'scheduleassessor')
        return { dept: undefined, assessor: undefined }
      if (this.namespace === 'pendapatanharian')
        return { tgl: undefined, pendapatan: undefined }
      if (this.namespace === 'shift')
        return { mulai: undefined, selesai: undefined, kode: undefined }
    }
  }
}
</script>

<style scoped></style>
