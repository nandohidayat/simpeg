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
                <v-col cols="4">
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
                <v-col cols="2">
                  <a-select
                    v-model="tipe"
                    style="width: 100%"
                    show-search
                    placeholder="Tipe"
                    option-filter-prop="label"
                    :options="pendapatanprofil.tipe"
                    :filter-option="filterOption"
                    @change="onChangeTipe"
                  ></a-select>
                </v-col>
                <v-col cols="2">
                  <a-button block type="primary" @click="updatePendapatan"
                    >Simpan</a-button
                  >
                </v-col>
                <v-col cols="2">
                  <a-dropdown-button :disabled="!list" @click="onChangeList()">
                    Refresh
                    <a-menu slot="overlay">
                      <a-menu-item key="copy" @click="copy = true">
                        <a-icon type="copy" /> Copy
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown-button>
                </v-col>
              </v-row>
            </v-card-text>
          </a-config-provider>
        </v-card>
      </v-col>
    </v-row>
    <component
      :is="tablePendapatan"
      ref="pendapatan"
      :tipe="tipe"
      :filter.sync="filter"
    ></component>
    <v-dialog v-model="copy" width="500">
      <v-card>
        <v-card-title> Copy Pendapatan </v-card-title>
        <v-card-text class="py-2">
          <v-card outlined>
            <a-config-provider :locale="locale">
              <v-card-text class="py-2">
                <v-row align="center" class="mx-1">
                  <v-col cols="4">
                    <a-date-picker
                      :open="copyIsOpen"
                      :value="copyYear"
                      mode="year"
                      placeholder="Pilih tahun"
                      style="width: 100%"
                      format="YYYY"
                      @change="onChange(copy)"
                      @openChange="(v) => onOpenChange(v, true)"
                      @panelChange="(v) => onPanelChange(v, true)"
                    />
                  </v-col>
                  <v-col cols="8">
                    <a-select
                      v-model="copyList"
                      style="width: 100%"
                      show-search
                      placeholder="Pendapatan"
                      option-filter-prop="label"
                      :disabled="disList"
                      :options="pendapatanlist.items"
                      :filter-option="filterOption"
                    ></a-select>
                  </v-col>
                </v-row>
              </v-card-text>
            </a-config-provider>
          </v-card>
          <div style="text-align: center" class="my-2">
            <v-icon>mdi-chevron-double-down</v-icon>
          </div>
          <v-card outlined class="mb-1">
            <a-config-provider :locale="locale">
              <v-card-text class="py-2">
                <v-row align="center" class="mx-1">
                  <v-col cols="4">
                    <a-date-picker
                      :open="isOpen"
                      :value="year"
                      mode="year"
                      placeholder="Pilih tahun"
                      style="width: 100%"
                      format="YYYY"
                      disabled
                      @change="onChange"
                      @openChange="onOpenChange"
                      @panelChange="onPanelChange"
                    />
                  </v-col>
                  <v-col cols="8">
                    <a-select
                      v-model="list"
                      style="width: 100%"
                      show-search
                      disabled
                      placeholder="Pendapatan"
                      option-filter-prop="label"
                      :options="pendapatanlist.items"
                      :filter-option="filterOption"
                      @change="onChangeList()"
                    ></a-select>
                  </v-col>
                </v-row>
              </v-card-text>
            </a-config-provider>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <a-button block type="primary" @click="onChangeList(true)"
            >Copy</a-button
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import locale from 'ant-design-vue/lib/locale/id_ID'
import moment from 'moment'
import 'moment/locale/id'

import Gaji from '@/components/pendapatan/table/gaji'
import Gajike from '@/components/pendapatan/table/gajike'
import Premi from '@/components/pendapatan/table/premi'
import EmptyTable from '@/components/base/empty-table'

// tipe :
// 0 Personalia
// 1 Keuangan

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
      Gaji,
      Premi,
      Gajike,
      locale,
      copy: false,
      copyIsOpen: false,
      copyList: undefined,
      copyYear: moment(),
      isOpen: false,
      list: undefined,
      year: moment(),
      disList: false,
      tipe: 0,
      filter: 0,
    }
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('pendapatanlist/fetchItems', {
        select: 1,
        year: moment().year(),
      }),
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
    ...mapState(['pendapatanprofil', 'pendapatan', 'pendapatanlist']),
    tablePendapatan() {
      if (parseInt(this.pendapatan.profil) === 1) {
        return this.Gaji
      }
      if (parseInt(this.pendapatan.profil) === 5) {
        return this.Premi
      }
      if (parseInt(this.pendapatan.profil) === 9) {
        return this.Gajike
      }
      return this.EmptyTable
    },
  },
  watch: {
    async year(val) {
      this.disList = true
      try {
        await this.$store.dispatch('pendapatanlist/fetchItems', {
          select: 1,
          year: moment(val).year(),
        })
      } catch (e) {
        this.$alert('error', e)
      }
      this.disList = false
    },
    async copyYear(val) {
      this.disList = true
      try {
        await this.$store.dispatch('pendapatanlist/fetchItems', {
          select: 1,
          year: moment(val).year(),
          copy: true,
        })
      } catch (e) {
        this.$alert('error', e)
      }
      this.disList = false
    },
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
    async updatePendapatan() {
      const { list, tipe } = this

      try {
        await this.$store.dispatch('pendapatan/updateItem', {
          list,
          tipe,
        })
        this.$alert('success', 'Successfully Saved')
      } catch (e) {
        this.$alert('error', e)
      }
    },
    async onChangeList(copy = false) {
      const query = { list: this.list }
      if (copy) query.copy = this.copyList
      try {
        await this.$store.dispatch('pendapatan/fetchItems', query)
        if (copy) this.$alert('success', 'Copy Successfully')
        else this.$alert('success', 'Loaded')
      } catch (e) {
        this.$alert('error', e)
      }
      if (copy) this.copy = false
    },
    onChangeTipe(val) {
      this.filter = val
    },
    onOpenChange(status, copy = false) {
      if (status) {
        if (copy) this.copyIsOpen = true
        else this.isOpen = true
      } else if (copy) this.copyIsOpen = false
      else this.isOpen = false
    },
    onPanelChange(v, copy = false) {
      if (copy) {
        this.copyYear = v
        this.copyIsOpen = false
      } else {
        this.year = v
        this.isOpen = false
      }
    },
    onChange(copy = false) {
      if (copy) this.isYear = undefined
      else this.year = undefined
    },
  },
}
</script>
