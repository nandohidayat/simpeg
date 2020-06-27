<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="11">
          <v-autocomplete
            v-model="dept"
            :items="departemen.departemens"
            :item-value="(obj) => obj.id_dept"
            :item-text="(obj) => obj.nm_dept"
            label="Departemen"
            clearable
            @change="getAkses"
          ></v-autocomplete>
        </v-col>
        <v-col cols="1" class="d-flex align-center">
          <v-divider vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="teal" dark small @click="saveAkses"
            ><v-icon>mdi-content-save</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="mt-2 mb-5"></v-divider>
      <v-row>
        <v-col cols="6">
          <h1 class="display-1 font-weight-light mb-3 black--text">
            List Akses
          </h1>
          <v-treeview
            v-model="selectedSemua"
            :items="akses.aksess"
            selectable
            open-all
            selected-color="teal"
          ></v-treeview>
        </v-col>
        <v-col cols="6">
          <h1 class="display-1 font-weight-light mb-3 black--text">
            Hanya Ketua
          </h1>
          <v-treeview
            v-model="selectedKepala"
            :items="akses.aksess"
            selectable
            open-all
            selected-color="teal"
          ></v-treeview>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'access',
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('departemen/fetchDepartemens'),
      store.dispatch('akses/fetchAksess'),
    ])
  },
  data() {
    return {
      dept: undefined,
      selectedSemua: undefined,
      selectedKepala: undefined,
      tab: undefined,
    }
  },
  computed: {
    ...mapState(['departemen', 'akses']),
  },
  methods: {
    async getAkses() {
      if (this.dept === undefined) {
        this.selectedSemua = []
        this.selectedKepala = []
      } else {
        try {
          await this.$store.dispatch('akses/fetchAkses', this.dept)
          this.selectedSemua = this.akses.akses.semua
          this.selectedKepala = this.akses.akses.kepala
        } catch (err) {
          this.$alert('error', err)
        }
      }
    },
    async saveAkses() {
      if (this.dept === undefined) return
      try {
        await this.$store.dispatch('akses/createAkses', {
          dept: this.dept,
          semua: this.selectedSemua,
          kepala: this.selectedKepala,
        })
        this.$alert('success', 'Successfully Saved')
      } catch (err) {
        this.$alert('error', err)
      }
    },
  },
  head() {
    return {
      title: 'Database Akses',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Data Akses',
        },
      ],
    }
  },
}
</script>
