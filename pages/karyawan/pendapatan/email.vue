<template>
  <div>
    <v-row justify="center" class="mb-3" no-gutters>
      <v-col cols="9">
        <v-card outlined>
          <a-config-provider :locale="locale">
            <v-card-text class="py-2">
              <v-row align="center" class="mx-3">
                <v-col cols="2">
                  <a-date-picker
                    :open="isOpen"
                    :value="year"
                    mode="year"
                    placeholder="Pilih tahun"
                    style="width: 100%"
                    format="YYYY"
                    @change="onChange"
                    @openChange="onOpenChange"
                    @panelChange="onPanelChange"
                  />
                </v-col>
                <v-col cols="7">
                  <a-select
                    v-model="list"
                    style="width: 100%"
                    show-search
                    placeholder="Pendapatan"
                    option-filter-prop="label"
                    :disabled="disList"
                    :options="pendapatanlist.items"
                    :filter-option="filterOption"
                    @change="onChangeList()"
                  ></a-select>
                </v-col>
                <v-col cols="3">
                  <a-button
                    block
                    type="primary"
                    :disabled="disabledSimpan"
                    @click="updatePendapatan"
                    >Simpan</a-button
                  >
                </v-col>
              </v-row>
            </v-card-text>
          </a-config-provider>
        </v-card>
      </v-col>
    </v-row>
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
import locale from 'ant-design-vue/lib/locale/id_ID'
import moment from 'moment'
import 'moment/locale/id'

import { mapState, mapGetters } from 'vuex'

moment.locale('id')

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
      locale,
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
      year: moment(),
      list: undefined,
      disList: false,
      isOpen: false,
    }
  },
  computed: {
    ...mapState([
      'pendapatanprofil',
      'karyawan',
      'pendapatanemail',
      'pendapatanlist',
    ]),
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
    onOpenChange(status) {
      if (status) {
        this.isOpen = true
      } else {
        this.isOpen = false
      }
    },
    onPanelChange(v) {
      this.year = v
      this.isOpen = false
    },
    onChange() {
      this.year = undefined
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
