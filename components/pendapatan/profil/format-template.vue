<template>
  <v-row class="grey lighten-5">
    <v-col cols="3">
      <v-btn
        block
        color="teal"
        depressed
        class="mb-5"
        dark
        @click="openDialog()"
        ><v-icon left>mdi-plus</v-icon> ADD</v-btn
      >
      <v-btn
        block
        color="teal"
        depressed
        dark
        class="mb-5"
        @click="updateProfil"
        ><v-icon left>mdi-content-save</v-icon> SAVE</v-btn
      >
      <v-btn block color="teal" depressed dark @click="exportTemplate"
        ><v-icon left>mdi-download</v-icon> DOWNLOAD</v-btn
      >
    </v-col>
    <v-col cols="3"> </v-col>
    <v-col cols="6">
      <v-card flat min-height="100">
        <format-sorter
          v-model="realValue"
          class="grey lighten-5"
          @del="openConfirm"
          @edit="(e) => openDialog(e)"
        ></format-sorter>
        <v-overlay :value="loading" absolute>
          <v-progress-circular indeterminate size="50"></v-progress-circular>
        </v-overlay>
      </v-card>
    </v-col>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="grey lighten-5">
          {{ edit ? 'Edit' : 'Tambah' }} Komponen
        </v-card-title>
        <v-card-text>
          <div class="header mt-3">Tipe</div>
          <v-row no-gutters>
            <v-col cols="4">
              <v-checkbox
                v-model="newData.type"
                dense
                label="Karyawan"
                value="K"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="newData.type"
                dense
                label="Header"
                value="H"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="newData.type"
                dense
                label="Number"
                value="N"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="newData.type"
                dense
                label="Positif"
                value="P"
              ></v-checkbox>
            </v-col>
            <v-col cols="4">
              <v-checkbox
                v-model="newData.type"
                dense
                label="Negatif"
                value="M"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-text-field
            v-model="newData.key"
            label="Key"
            dense
            outlined
            class="mt-3"
          ></v-text-field>
          <v-text-field
            v-model="newData.value"
            label="Value"
            dense
            outlined
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal" dark @click="updateFormat"
            ><v-icon left>mdi-content-save</v-icon> Simpan</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <base-confirm
      v-model="confirm"
      :text="text"
      @confirm="delFormat()"
    ></base-confirm>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

import FormatSorter from '@/components/pendapatan/profil/format-sorter'

export default {
  components: {
    FormatSorter,
  },
  props: {
    keuangan: {
      type: Boolean,
      default: false,
    },
    profil: {
      type: [Number, String],
      default: undefined,
    },
    tipe: {
      type: String,
      default: undefined,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialog: false,
      newData: {
        type: [],
        key: undefined,
        value: undefined,
        elements: [],
      },
      edit: false,
      del: undefined,
      confirm: false,
      text: '',
    }
  },
  computed: {
    ...mapState(['pendapatanprofil']),
    realValue: {
      get() {
        return this.pendapatanprofil[this.keuangan ? 'keuangan' : 'personalia']
      },
      set(value) {
        this.$store.commit(
          `pendapatanprofil/update${this.keuangan ? 'Keuangan' : 'Personalia'}`,
          value
        )
      },
    },
  },
  methods: {
    openDialog(value = undefined) {
      if (value) {
        this.newData = value
        this.edit = true
      } else {
        this.newData = {
          type: [],
          key: '',
          value: '',
          elements: [],
        }
        this.edit = false
      }
      this.dialog = true
    },
    updateFormat() {
      this.$store.commit(
        `pendapatanprofil/${this.edit ? 'edit' : 'add'}${
          this.keuangan ? 'Keuangan' : 'Personalia'
        }`,
        this.newData
      )
      this.dialog = false
    },
    openConfirm(value) {
      this.del = value
      this.text = `Delete ${value.key}?`
      this.confirm = true
    },
    delFormat() {
      this.$store.commit(
        `pendapatanprofil/del${this.keuangan ? 'Keuangan' : 'Personalia'}`,
        this.del.id
      )
      this.confirm = false
    },
    exportTemplate() {
      this.$store.dispatch('pendapatanpeg/exportTemplate', {
        profil: this.profil,
        tipe: this.tipe,
      })
    },
    async updateProfil() {
      try {
        await this.$store.dispatch('pendapatanprofil/updateProfil', {
          value: this.profil,
          format:
            this.pendapatanprofil[
              `${this.keuangan ? 'keuangan' : 'personalia'}`
            ],
          type: `${this.keuangan ? 'keuangan' : 'personalia'}`,
        })

        this.$alert('success', 'Successfully Saved')
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
}
</script>
