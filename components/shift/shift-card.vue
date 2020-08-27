<template>
  <div>
    <v-data-table
      v-model="selShift"
      :headers="header"
      :items="shift.shifts"
      item-key="id_shift"
      multi-sort
      show-select
      items-per-page="100"
    >
      <template #top>
        <v-toolbar flat class="my-2">
          <v-autocomplete
            v-model="selDept"
            class="mr-4"
            label="Departemen"
            :items="departemen.departemens"
            :item-value="(o) => o.id_dept"
            :item-text="(o) => o.nm_dept"
            hide-details
            outlined
            dense
            clearable
            @change="getSelected()"
          >
          </v-autocomplete>
          <v-btn
            color="teal"
            dark
            depressed
            class="mr-4"
            :disabled="disabled"
            @click="updateSelected()"
            ><v-icon left>mdi-content-save</v-icon>Simpan Shift</v-btn
          >
          <v-btn color="teal" dark depressed @click="openDialog()"
            ><v-icon left>mdi-plus</v-icon>Tambah Shift</v-btn
          >
        </v-toolbar>
      </template>
      <template #item.color="{item}">
        <v-chip :color="item.color || 'white'" dark>{{ item.color }}</v-chip>
      </template>
      <template #item.action="{item}">
        <v-icon @click="openDialog(item)">
          mdi-pencil
        </v-icon>
        <v-icon @click="deleteConfirm(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <base-confirm
      v-model="confirm"
      :text="text"
      @confirm="deleteData()"
    ></base-confirm>
    <shift-form v-model="dialog" :edit="edit" :data="data"></shift-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ShiftForm from '@/components/shift/shift-form'
import BaseConfirm from '@/components/base/base-confirm'

export default {
  components: {
    ShiftForm,
    BaseConfirm,
  },
  data() {
    return {
      header: [
        {
          text: 'Mulai',
          value: 'mulai',
        },
        {
          text: 'Selesai',
          value: 'selesai',
        },
        {
          text: 'Kode',
          value: 'kode',
        },
        {
          text: 'Color',
          value: 'color',
        },
        {
          text: 'Ket',
          value: 'keterangan',
        },
        {
          text: 'Action',
          value: 'action',
        },
      ],
      selDept: undefined,
      selShift: [],
      disabled: false,
      dialog: false,
      edit: false,
      data: undefined,
      confirm: false,
      text: '',
      delete: undefined,
      newShift: {
        mulai: undefined,
        selesai: undefined,
        kode: undefined,
        color: undefined,
        keterangan: undefined,
      },
    }
  },
  computed: {
    ...mapState(['shift', 'departemen']),
  },
  methods: {
    async getSelected() {
      if (this.selDept === undefined) {
        this.selShift = []
      } else {
        try {
          await this.$store.dispatch(`shift/fetchDepartemen`, this.selDept)
          this.selShift = this.shift.departemen
        } catch (err) {
          this.$alert('error', err)
        }
      }
    },
    async updateSelected() {
      if (this.selDept === undefined) return
      this.disabled = true

      const datashift = { dept: this.selDept, shift: this.selShift }

      try {
        await this.$store.dispatch(`shift/updateDepartemen`, datashift)

        this.$alert('success', 'Successfully Saved')
      } catch (err) {
        this.$alert('error', err)
      } finally {
        this.disabled = false
      }
    },
    openDialog(item = undefined) {
      if (item) {
        this.edit = true
        this.data = item
      } else {
        this.edit = false
        this.data = this.newShift
      }
      this.dialog = true
    },
    deleteConfirm(del) {
      this.delete = del
      this.text = `Hapus shift ${del.kode}`
      this.confirm = true
    },
    async deleteData() {
      try {
        await this.$store.dispatch('shift/deleteShift', this.delete.id_shift)

        this.confirm = false
        this.$alert('success', 'Successfully Deleted')
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
}
</script>
