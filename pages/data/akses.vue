<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="11">
          <v-autocomplete
            v-model="current"
            :items="pegawai.pegawais"
            :item-value="(obj) => obj.id_pegawai"
            :item-text="(obj) => obj.nm_pegawai"
            label="Pegawai"
            hide-details
            clearable
            @change="getAkses"
          ></v-autocomplete>
        </v-col>
        <v-col cols="1" class="d-flex align-center justify-center">
          <v-btn color="teal" dark @click="saveAkses"
            ><v-icon>mdi-content-save</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="mt-2 mb-5"></v-divider>
      <div class="mx-5">
        <v-treeview
          v-model="active"
          :items="items"
          selectable
          open-all
          selected-color="teal"
        ></v-treeview>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'access',
  async fetch({ store }) {
    await store.dispatch('pegawai/fetchPegawais', { select: 1 })
  },
  data() {
    return {
      items: [
        {
          id: 1001,
          name: 'Database',
          children: [
            { id: 3, name: 'Data Jadwal' },
            { id: 4, name: 'Data Akses' },
          ],
        },
        {
          id: 1002,
          name: 'Karyawan',
          children: [
            { id: 1, name: 'Daftar Karyawan' },
            {
              id: 1003,
              name: 'Jadwal Karyawan',
              children: [
                {
                  id: 2,
                  name: 'Read Jadwal Karyawan',
                },
                {
                  id: 5,
                  name: 'Update Jadwal Karyawan',
                },
                {
                  id: 6,
                  name: 'All Jadwal Karyawan',
                },
              ],
            },
          ],
        },
      ],
      current: undefined,
      active: [],
    }
  },
  computed: {
    ...mapState(['akses', 'pegawai']),
  },
  methods: {
    async getAkses() {
      if (this.current === undefined) {
        this.active = []
      } else {
        try {
          await this.$store.dispatch('akses/fetchAkses', this.current)
          this.active = this.akses.akses
        } catch (err) {
          this.$alert('error', err)
        }
      }
    },
    async saveAkses() {
      if (this.current === undefined) return
      try {
        await this.$store.dispatch('akses/updateAkses', {
          pegawai: this.current,
          akses: this.active,
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
