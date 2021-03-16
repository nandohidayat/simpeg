<template>
  <div>
    <v-row justify="center" class="mb-3" no-gutters>
      <v-col cols="8">
        <v-card outlined>
          <a-config-provider :locale="locale">
            <v-card-text>
              <v-row align="center" class="mx-3">
                <v-col cols="3">
                  <a-select
                    v-model="tipe"
                    style="width: 100%"
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
                    style="width: 100%"
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
                    style="width: 100%"
                    :format="'MMMM YYYY'"
                  />
                </v-col>
                <v-col cols="3"
                  ><a-button block type="primary" @click="updatePendapatan"
                    >Simpan</a-button
                  ></v-col
                >
              </v-row>
            </v-card-text>
          </a-config-provider>
        </v-card>
      </v-col>
    </v-row>
    <v-card>
      <component :is="tablePendapatan"></component>
    </v-card>
  </div>
</template>

<script>
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
  data() {
    return {
      EmptyTable,
      PGaji,
      locale,
      tipe: undefined,
      profil: undefined,
      month: undefined,
      search: '',
      personalia: ['Pendapatan', 'Pengeluaran', 'Pajak'],
      keuangan: ['Bank', 'Koperasi', 'Rumah Sakit', 'Organisasi', 'Lain-lain'],
    }
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('pendapatanprofil/fetchProfils', { select: 1 }),
    ])
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
        this.$alert('success', 'Loaded')
      }
    },
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
    async updatePendapatan() {
      const { tipe, profil } = this
      let { month } = this
      month = moment(month).format('MM-YYYY')

      try {
        await this.$store.dispatch('pendapatan/updateItem', {
          month,
          tipe,
          profil,
        })
        this.$alert('success', 'Successfully Saved')
      } catch (e) {
        this.$alert('error', e)
      }
    },
  },
}
</script>
