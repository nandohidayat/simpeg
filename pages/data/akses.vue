<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="11">
          <v-select
            v-model="dept"
            :items="departemen.departemens"
            :item-value="(obj) => obj.id_departemen"
            :item-text="(obj) => obj.departemen"
            @change="getAkses"
            label="Departemen"
            clearable
          ></v-select>
        </v-col>
        <v-col cols="1" class="d-flex align-center">
          <v-divider vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn @click="saveAkses" color="teal" dark small
            ><v-icon>mdi-content-save</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="mt-2 mb-5"></v-divider>
      <v-treeview
        v-model="selected"
        :items="akses.aksess"
        :open.sync="open"
        selectable
        selected-color="teal"
      ></v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: 'Database Akses',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Data Akses'
        }
      ]
    }
  },
  data() {
    return {
      dept: undefined,
      selected: undefined,
      open: undefined
    }
  },
  computed: {
    ...mapState(['departemen', 'akses'])
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('departemen/fetchDepartemens'),
      store.dispatch('akses/fetchAksess')
    ])
  },
  created() {
    this.open = this.opened()
  },
  methods: {
    opened() {
      return this.akses.aksess.map((a) => a.id)
    },
    async getAkses() {
      if (this.dept === undefined) {
        this.selected = []
      } else {
        try {
          await this.$store.dispatch('akses/fetchAkses', this.dept)
          this.selected = this.akses.akses
        } catch (err) {
          this.$store.dispatch('notification/addError', err)
        }
      }
    },
    async saveAkses() {
      if (this.dept === undefined) return

      await this.$store.dispatch('akses/createAkses', {
        departemen: this.dept,
        akses: this.selected
      })
    }
  }
}
</script>

<style scoped></style>
