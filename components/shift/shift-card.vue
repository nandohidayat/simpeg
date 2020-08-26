<template>
  <v-data-table
    v-model="selShift"
    :headers="header"
    :items="shift.shifts"
    item-key="id_shift"
    multi-sort
    show-select
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
        <v-btn color="teal" dark depressed class="mr-4"
          ><v-icon left>mdi-content-save</v-icon>Simpan Shift</v-btn
        >
        <v-btn color="teal" dark depressed
          ><v-icon left>mdi-plus</v-icon>Tambah Shift</v-btn
        >
      </v-toolbar>
    </template>
    <template #item.color="{item}">
      <v-chip :color="item.color || 'white'" dark>{{ item.color }}</v-chip>
    </template>
    <template #item.action>
      <v-icon small>
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

// import baseTable from '@/components/base/base-table'
// import shiftForm from '@/components/shift/shift-form'

export default {
  components: {
    // 'base-table': baseTable,
    // 'shift-form': shiftForm,
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
      store: 'shift',
      state: 'shifts',
      action: 'Shift',
      data: this.newData(),
      selDept: undefined,
      selShift: [],
    }
  },
  computed: {
    ...mapState(['shift', 'departemen']),
  },
  methods: {
    reset() {
      this.data = this.newData()
    },
    newData() {
      return {
        mulai: undefined,
        selesai: undefined,
        kode: undefined,
        color: undefined,
        keterangan: undefined,
      }
    },
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
  },
}
</script>
