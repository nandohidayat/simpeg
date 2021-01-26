<template>
  <div>
    <v-row justify="center" class="mb-3">
      <v-col cols="6">
        <v-card outlined>
          <v-row align="center" class="mx-3">
            <v-col cols="8">
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
            <v-col cols="4">
              <a-button type="primary" block>Buat Slip</a-button>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'
import locale from '../../../node_modules/ant-design-vue/es/date-picker/locale/zh_CN'

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
      month: undefined,
      locale,
    }
  },
  computed: {
    ...mapState(['pendapatanprofil']),
    monthString() {
      return moment(this.month).locale('id').format('MMMM YYYY')
    },
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
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
