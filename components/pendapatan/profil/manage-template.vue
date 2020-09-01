<template>
  <div>
    <v-row align="center">
      <v-col cols="6">
        <v-select
          v-model="profil"
          label="Profil Pendapatan"
          :items="pendapatanprofil.profils"
          dense
          outlined
          hide-details
        ></v-select>
      </v-col>
      <v-col cols="2"
        ><v-btn
          color="teal"
          depressed
          dark
          block
          :disabled="!profil"
          @click="openDialog(true)"
          ><v-icon left>mdi-pencil</v-icon> EDIT</v-btn
        ></v-col
      >
      <v-col cols="2"
        ><v-btn color="teal" depressed dark block @click="openDialog()"
          ><v-icon left>mdi-plus</v-icon> ADD</v-btn
        ></v-col
      >
      <v-col cols="2"
        ><v-btn color="teal" depressed dark block @click="deleteConfirm()"
          ><v-icon left>mdi-minus</v-icon> REMOVE</v-btn
        ></v-col
      >
    </v-row>
    <form-template v-model="dialog" :edit="edit" :data="data"></form-template>
    <base-confirm
      v-model="confirm"
      :text="text"
      @confirm="deleteData()"
    ></base-confirm>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FormTemplate from '@/components/pendapatan/profil/form-template'

export default {
  components: {
    FormTemplate,
  },
  data() {
    return {
      profil: undefined,
      dialog: false,
      edit: false,
      data: undefined,
      confirm: undefined,
      text: undefined,
      newProfil: {
        text: undefined,
      },
    }
  },
  computed: {
    ...mapState(['pendapatanprofil']),
    current() {
      return this.pendapatanprofil.profils.find((p) => p.value === this.profil)
    },
  },
  methods: {
    openDialog(edit = false) {
      if (edit) {
        this.edit = true
        this.data = this.current
      } else {
        this.edit = false
        this.data = this.newProfil
      }
      this.dialog = true
    },
    deleteConfirm() {
      this.text = `Hapus ${this.current.text}?`
      this.confirm = true
    },
    async deleteData() {
      try {
        await this.$store.dispatch(
          'pendapatanprofil/deleteProfil',
          this.current.value
        )

        this.profil = undefined
        this.confirm = false
        this.$alert('success', 'Successfully Deleted')
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
}
</script>
