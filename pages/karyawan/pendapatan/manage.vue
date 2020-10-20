<template>
  <div>
    <v-card outlined class="mb-3">
      <v-card-text>
        <v-row align="center">
          <v-col cols="6">
            <v-select
              v-model="profil"
              label="Profil Pendapatan"
              :items="pendapatanprofil.profils"
              dense
              outlined
              hide-details
              @change="getProfil"
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
      </v-card-text>
    </v-card>
    <v-card class="grey lighten-5" flat>
      <v-tabs v-model="tab" color="teal" grow background-color="transparent">
        <v-tab>Format Personalia</v-tab>
        <v-tab>Format Keuangan</v-tab>
      </v-tabs>
      <v-card-text>
        <v-tabs-items v-if="profil" v-model="tab">
          <v-tab-item>
            <format-template
              :profil="profil"
              :tipe="tipe"
              :loading="loading"
            ></format-template>
          </v-tab-item>
          <v-tab-item>
            <format-template
              keuangan
              :profil="profil"
              :tipe="tipe"
              :loading="loading"
            ></format-template>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
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
import FormatTemplate from '@/components/pendapatan/profil/format-template'

export default {
  middleware({ redirect, $auth }) {
    if (!$auth.user.akses.map((o) => parseInt(o)).includes(9)) {
      return redirect('/404')
    }
  },
  components: {
    FormTemplate,
    FormatTemplate,
  },
  data() {
    return {
      profil: undefined,
      dialog: false,
      edit: false,
      data: undefined,
      confirm: undefined,
      text: undefined,
      tab: undefined,
      loading: undefined,
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
    tipe() {
      return this.tab === 0 ? 'format_personalia' : 'format_keuangan'
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
    async getProfil() {
      try {
        this.loading = true
        await this.$store.dispatch('pendapatanprofil/fetchProfil', this.profil)
      } catch (e) {
        this.$alert('error', e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
