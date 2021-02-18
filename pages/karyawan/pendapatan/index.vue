<template>
  <div>
    <v-row justify="center" class="mb-3" no-gutters>
      <v-col cols="8">
        <v-card outlined>
          <a-config-provider :locale="locale">
            <div>
              <v-row align="center" class="mx-3">
                <v-col cols="3">
                  <a-select
                    v-model="tipe"
                    style="width: 100%;"
                    show-search
                    placeholder="Tipe"
                    option-filter-prop="label"
                    :options="pendapatanprofil.tipe"
                    :filter-option="filterOption"
                  ></a-select>
                </v-col>
                <v-col cols="3">
                  <a-select
                    v-model="profil"
                    style="width: 100%;"
                    show-search
                    placeholder="Profil"
                    option-filter-prop="label"
                    :options="pendapatanprofil.profils"
                    :filter-option="filterOption"
                  ></a-select>
                </v-col>
                <v-col cols="3">
                  <a-month-picker
                    v-model="month"
                    placeholder="Bulan"
                    style="width: 100%;"
                    :format="'MMMM YYYY'"
                  />
                </v-col>
                <v-col cols="3"
                  ><a-button block type="primary">Simpan</a-button></v-col
                >
              </v-row>
              <v-row class="mx-3">
                <v-col class="pt-0">
                  <a-input-search
                    v-model="search"
                    placeholder="Cari"
                    style="width: 100%;"
                    @change="fetchPendapatan"
                  ></a-input-search>
                </v-col>
              </v-row>
            </div>
          </a-config-provider>
        </v-card>
      </v-col>
    </v-row>
    <v-card>
      <v-card-text class="pa-1">
        <component :is="tablePendapatan" :data="data"></component>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapState } from 'vuex'
import locale from 'ant-design-vue/lib/locale/id_ID'
import moment from 'moment'
import 'moment/locale/id'

import PGaji from '@/components/pendapatan/table/p-gaji'
import EmptyTable from '@/components/base/empty-table'

moment.locale('id')

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](8)) {
      return redirect('/404')
    }
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('pendapatanprofil/fetchProfils', { select: 1 }),
    ])
  },
  data() {
    this.lastFetchId = 0
    this.fetchPendapatan = debounce(this.fetchPendapatan, 500)
    return {
      EmptyTable,
      PGaji,
      locale,
      data: [],
      tipe: undefined,
      profil: undefined,
      month: undefined,
      search: '',
      personalia: ['Pendapatan', 'Pengeluaran', 'Pajak'],
      keuangan: ['Bank', 'Koperasi', 'Rumah Sakit', 'Organisasi', 'Lain-lain'],
    }
  },
  computed: {
    ...mapState(['pendapatanprofil', 'pendapatan']),
    updater() {
      return this.tipe + this.profil + this.month
    },
    tablePendapatan() {
      if (this.month) {
        if (this.tipe === 'personalia') {
          if (parseInt(this.profil) === 1) {
            return this.PGaji
          }
          return this.EmptyTable
        }
        return this.EmptyTable
      }
      return this.EmptyTable
    },
  },
  watch: {
    async updater(val) {
      const { tipe, profil } = this
      let { month } = this
      if (tipe && profil && month) {
        month = moment(month).format('MM-YYYY')
        await this.$store.dispatch('pendapatan/fetchItems', {
          tipe,
          profil,
          month,
        })
        this.fetchPendapatan()
      }
    },
  },
  created() {
    this.data = this.pendapatan.items
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
    fetchPendapatan() {
      this.lastFetchId += 1
      const fetchId = this.lastFetchId

      if (fetchId !== this.lastFetchId) {
        return
      }

      const escapeRegExp = (
        str // or better use 'escape-string-regexp' package
      ) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')

      const filterBy = (term) => {
        const column = ['nik_pegawai', 'nm_pegawai']
        const re = new RegExp(escapeRegExp(term), 'i')
        return (person) => {
          for (const prop in person) {
            if (
              !column.includes(prop) ||
              !Object.prototype.hasOwnProperty.call(person, prop)
            ) {
              continue
            }
            if (re.test(person[prop])) {
              return true
            }
          }
          return false
        }
      }

      const data = this.pendapatan.items.filter(filterBy(this.search))

      this.data = data
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
