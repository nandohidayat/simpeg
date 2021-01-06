<template>
  <div>
    <v-card outlined class="mb-3">
      <v-card-text>
        <v-row align="center">
          <v-col cols="5">
            <a-select
              v-model="pendapatanprofil.profil"
              style="width: 100%;"
              show-search
              placeholder="Profil"
              option-filter-prop="label"
              :options="pendapatanprofil.profils"
              :filter-option="filterOption"
              disabled
            ></a-select>
          </v-col>
          <v-col cols="5">
            <a-select
              v-model="tipe"
              style="width: 100%;"
              show-search
              placeholder="Tipe"
              option-filter-prop="label"
              :options="pendapatanprofil.tipes"
              :filter-option="filterOption"
            ></a-select>
          </v-col>
          <v-col cols="2">
            <a-button type="primary" block @click="openUpload()"
              >Upload</a-button
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card outlined>
      <v-data-table
        dense
        :headers="pendapatanpeg.header"
        :items="pendapatanpeg.pendapatans"
      ></v-data-table>
    </v-card>
    <a-modal v-model="dialog" :closable="false">
      <v-card outlined flat>
        <v-simple-table>
          <tbody>
            <tr>
              <td>Bulan</td>
              <td>
                <a-month-picker
                  v-model="upload.bulan"
                  placeholder="Bulan"
                  style="width: 100%;"
                />
              </td>
            </tr>
            <tr>
              <td>Profil</td>
              <td>
                <a-select
                  v-model="upload.profil"
                  style="width: 100%;"
                  show-search
                  placeholder="Profil"
                  option-filter-prop="label"
                  :options="pendapatanprofil.profils"
                  :filter-option="filterOption"
                  :disabled="!personalia"
                ></a-select>
              </td>
            </tr>
            <tr>
              <td>Tipe</td>
              <td>
                <a-select
                  v-model="upload.tipe"
                  style="width: 100%;"
                  show-search
                  placeholder="Tipe"
                  option-filter-prop="label"
                  :options="pendapatanprofil.tipes"
                  :filter-option="filterOption"
                ></a-select>
              </td>
            </tr>
            <tr>
              <td>File</td>
              <td>
                <a-upload
                  :file-list="upload.file"
                  :before-upload="beforeUpload"
                  :show-upload-list="false"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                >
                  <a-button>
                    <a-icon type="upload" /> {{ fileLabel }}
                  </a-button>
                </a-upload>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
      <template slot="footer">
        <a-button key="back" @click="dialog = false">
          Cancel
        </a-button>
        <a-button
          key="submit"
          type="primary"
          :disabled="!personalia"
          @click="importPendapatan()"
        >
          Upload
        </a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState, mapGetters } from 'vuex'

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](8)) {
      return redirect('/404')
    }
  },
  async fetch({ store }) {
    await store.dispatch('pendapatanprofil/fetchProfils', { select: 1 })
  },
  data() {
    return {
      profil: undefined,
      tipe: undefined,
      fileLabel: 'Upload',
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      dialog: false,
      upload: {
        bulan: undefined,
        profil: undefined,
        tipe: undefined,
        file: [],
      },
    }
  },
  computed: {
    ...mapState(['pendapatanprofil', 'pendapatanpeg']),
    ...mapGetters('user', ['isAdmin']),
    dateMoment() {
      return this.date ? moment(this.date).locale('id').format('MMMM YYYY') : ''
    },
    disBtn() {
      return !(this.tipe && this.profil)
    },
    updater() {
      return this.tipe + this.profil + this.date
    },
    disableUp() {
      return (
        this.upload.profil === undefined ||
        this.upload.tipe === undefined ||
        this.upload.file.length === 0
      )
    },
    personalia() {
      return (
        (this.$auth.user.dept && this.$auth.user.dept.includes('d-44')) ||
        this.isAdmin
      )
    },
  },
  watch: {
    updater(val) {
      if (this.tipe && this.profil) {
        this.getPen()
      }
    },
  },
  methods: {
    // export pendapatan
    exPen() {
      this.$store.dispatch('pendapatanpeg/exportPendapatan', {
        profil: this.profil,
        tipe: this.tipe,
        date: moment(this.date).format('MM-YYYY'),
      })
    },
    async getPen() {
      try {
        await this.$store.dispatch('pendapatanpeg/fetchPendapatans', {
          profil: this.profil,
          tipe: this.tipe,
          date: this.date,
        })
      } catch (err) {
        this.$alert('error', err)
      }
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
    beforeUpload(file) {
      this.upload.file = [file]
      if (file.name.length > 40) {
        this.fileLabel = file.name.substring(0, 37) + '...'
      } else {
        this.fileLabel = file.name
      }
      return false
    },
    async importPendapatan() {
      const { bulan, profil, tipe, file } = this.upload
      const formData = new FormData()
      formData.append('bulan', bulan)
      formData.append('profil', profil)
      formData.append('tipe', tipe)
      formData.append('file', file[0])
      try {
        await this.$axios.$post(
          `${this.$axios.defaults.baseURL}pendapatanpeg/pendapatan`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

        this.$store.commit('pendapatanprofil/SET_PROFIL', profil)
        this.$alert('success', 'Successfully Imported')
        this.dialog = false
      } catch (e) {
        this.$alert('error', e)
      }
    },
    openUpload() {
      this.upload.profil = this.pendapatanprofil.profil
      this.upload.bulan = moment()
      this.dialog = true
    },
  },
  head() {
    return {
      title: 'Pendapatan Karyawan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Pendapatan Karyawan',
        },
      ],
    }
  },
}
</script>
