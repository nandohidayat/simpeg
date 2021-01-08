<template>
  <div>
    <v-card outlined class="mb-3">
      <v-card-text>
        <v-row align="center">
          <v-col cols="4">
            <a-select
              :value="pendapatanprofil.profil"
              style="width: 100%;"
              show-search
              placeholder="Profil"
              option-filter-prop="label"
              :options="pendapatanprofil.profils"
              :filter-option="filterOption"
              disabled
            ></a-select>
          </v-col>
          <v-col cols="4">
            <a-select
              v-model="data.karyawan"
              style="width: 100%;"
              show-search
              placeholder="Karyawan"
              option-filter-prop="label"
              :options="karyawan.karyawans"
              :filter-option="filterOption"
              allow-clear
            ></a-select>
          </v-col>
          <v-col cols="4">
            <v-row no-gutters>
              <v-col cols="8" class="pr-2">
                <a-button icon="mail" block @click="openConfirm()">
                  Kirim Email
                </a-button>
              </v-col>
              <v-col cols="4" class="pl-2">
                <a-button icon="reload" block @click="getEmail(true)">
                </a-button>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card outlined>
      <v-data-table
        :items="pendapatanemail.emails"
        :headers="header"
      ></v-data-table>
    </v-card>
    <base-confirm
      v-model="confirm"
      :text="text"
      @confirm="sendEmail"
    ></base-confirm>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](12)) {
      return redirect('/404')
    }
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('pendapatanprofil/fetchProfils', { select: 1 }),
      store.dispatch('karyawan/fetchKaryawans', { select: 1, for: 'ant' }),
    ])
  },
  data() {
    return {
      data: {
        karyawan: undefined,
      },
      menu: false,
      header: [
        { text: 'Nama', value: 'nama' },
        { text: 'Email', value: 'email' },
        { text: 'Subjek', value: 'subjek' },
        { text: 'Kirim', value: 'kirim' },
        { text: 'Terkirim', value: 'terkirim' },
        { text: 'Status', value: 'status' },
      ],
      confirm: false,
      text: '',
    }
  },
  computed: {
    ...mapState(['pendapatanprofil', 'karyawan', 'pendapatanemail']),
    ...mapGetters('karyawan', ['getKar']),
    dateMoment() {
      return moment(this.data.date).locale('id').format('MMMM YYYY')
    },
    updater() {
      return this.data.profil + this.data.date
    },
  },
  watch: {
    updater(val) {
      this.getEmail()
    },
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
    async getEmail(refresh = false) {
      try {
        await this.$store.dispatch('pendapatanemail/fetchEmails', this.data)

        if (refresh) {
          this.$alert('success', 'Sukses di refresh')
        }
      } catch (e) {
        this.$alert('error', e)
      }
    },
    openConfirm() {
      this.text = 'Kirim Email Pendapatan ke '
      if (this.data.karyawan) {
        this.text += `${this.getKar(this.data.karyawan)}?`
      } else {
        this.text += 'Semua Pegawai?'
      }
      this.confirm = true
    },
    async sendEmail() {
      try {
        await this.$store.dispatch('pendapatanemail/sendEmails', {
          id_pegawai: this.data.karyawan,
        })

        this.$alert('success', 'Sukses dikirim')
      } catch (e) {
        this.$alert('error', e)
      } finally {
        this.confirm = false
      }
    },
  },
  head() {
    return {
      title: 'Email Pendapatan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Email Pendapatan',
        },
      ],
    }
  },
}
</script>
