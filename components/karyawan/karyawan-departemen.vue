<template>
  <div>
    <v-data-table :headers="header" :items="logdepartemen.logs" class="mt-5">
      <template #top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Mutasi Departemen</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="teal" dark depressed @click.stop="fillData()"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </v-toolbar>
      </template>
      <template #item.action="{item}">
        <v-btn icon>
          <v-icon small @click="fillData(item)">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon small @click="openConfirm(item.id_log_departemen)"
            >mdi-delete</v-icon
          >
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          Disposisi Departemen
        </v-card-title>
        <v-card-text class="pt-4">
          <v-autocomplete
            v-model="data.dept"
            dense
            outlined
            :item-text="(o) => o.nm_dept"
            :item-value="(o) => o.id_dept"
            :items="departemen.departemens"
            label="Departemen"
          ></v-autocomplete>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="data.masuk"
                outlined
                dense
                label="Masuk"
                v-bind="attrs"
                clearable
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="data.masuk"
              no-title
              color="teal"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="data.keluar"
                outlined
                dense
                label="Keluar"
                v-bind="attrs"
                clearable
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="data.keluar"
              no-title
              color="teal"
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="teal" @click="saveData()">Save</v-btn>
          <v-btn text color="warning" @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <base-confirm
      v-model="confirm"
      text="Delete mutasi?"
      @confirm="deleteData()"
    ></base-confirm>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseConfirm from '@/components/base/base-confirm'

export default {
  components: {
    BaseConfirm,
  },
  props: {
    id: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      header: [
        { text: 'Departemen', value: 'nm_dept' },
        { text: 'Masuk', value: 'masuk' },
        { text: 'Keluar', value: 'keluar' },
        { text: 'Action', value: 'action' },
      ],
      edit: false,
      menu: false,
      menu1: false,
      dialog: false,
      data: { dept: undefined, masuk: undefined, keluar: undefined },
      confirm: false,
      del: undefined,
    }
  },
  computed: {
    ...mapState(['logdepartemen', 'departemen']),
  },
  methods: {
    async saveData() {
      try {
        this.data.pegawai = this.id
        await this.$store.dispatch(
          `logdepartemen/${this.edit ? 'updateLog' : 'createLog'}`,
          this.data
        )

        this.dialog = false
        this.$alert('success', 'Successfully Saved')
      } catch (err) {
        this.$alert('error', err)
      }
    },
    async deleteData() {
      try {
        await this.$store.dispatch('logdepartemen/deleteLog', this.del)

        this.confirm = false
        this.$alert('success', 'Successfully Deleted')
      } catch (err) {
        this.$alert('error', err)
      }
    },
    fillData(item = undefined) {
      if (item) {
        this.data = {
          id_log_departemen: item.id_log_departemen,
          dept: item.id_dept,
          masuk: item.masuk,
          keluar: item.keluar,
        }
        this.edit = true
      } else {
        this.data = { dept: undefined, masuk: undefined, keluar: undefined }
        this.edit = false
      }
      this.dialog = true
    },
    openConfirm(id) {
      this.del = id
      this.confirm = true
    },
  },
}
</script>
