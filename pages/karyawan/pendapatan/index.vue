<template>
  <div>
    <v-row justify="center" class="mb-3" no-gutters>
      <v-col cols="9">
        <v-card outlined>
          <a-config-provider :locale="locale">
            <v-card-text>
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
                    @change="onChangeList"
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
                  <a-button
                    block
                    type="primary"
                    :disabled="disabledSimpan"
                    @click="updatePendapatan"
                    >Simpan</a-button
                  >
                </v-col>
                <v-col cols="2">
                  <a-popconfirm
                    v-if="showDone"
                    title="Apakah anda yakin selesai mengedit?"
                    @confirm="editPendapatan(2)"
                  >
                    <a-button block type="danger">Done</a-button>
                  </a-popconfirm>
                  <div v-else-if="showEdited" class="caption">
                    <div style="line-height: 1.5">Currently edited by:</div>
                    <div style="line-height: 1">
                      {{ pendapatan.edit ? pendapatan.edit.nm_pegawai : '' }}
                    </div>
                  </div>
                  <a-popconfirm
                    v-else
                    title="Apakah anda yakin akan mengedit?"
                    @confirm="editPendapatan(1)"
                  >
                    <a-button block type="danger">Edit</a-button>
                  </a-popconfirm>
                </v-col>
              </v-row>
            </v-card-text>
          </a-config-provider>
        </v-card>
      </v-col>
    </v-row>
    <component :is="tablePendapatan" ref="pendapatan" :tipe="tipe"></component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import locale from 'ant-design-vue/lib/locale/id_ID'
import moment from 'moment'
import 'moment/locale/id'

import Gaji from '@/components/pendapatan/table/gaji'
import Premi from '@/components/pendapatan/table/premi'
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
      Gaji,
      Premi,
      locale,
      tipe: 'personalia',
      year: moment(),
      list: undefined,
      disList: false,
      isOpen: false,
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
    updater() {
      return this.tipe + this.list
    },
    tablePendapatan() {
      if (this.list) {
        if (parseInt(this.pendapatan.profil) === 1) {
          return this.Gaji
        }
        if (parseInt(this.pendapatan.profil) === 5) {
          return this.Premi
        }
        return this.EmptyTable
      }
      return this.EmptyTable
    },
    disabledSimpan() {
      return (
        !this.pendapatan.edit ||
        this.pendapatan.edit.id_pegawai !== this.$auth.user.id_pegawai
      )
    },
    showDone() {
      return (
        this.pendapatan.edit &&
        this.pendapatan.edit.id_pegawai === this.$auth.user.id_pegawai
      )
    },
    showEdited() {
      return (
        this.pendapatan.edit &&
        this.pendapatan.edit.id_pegawai !== this.$auth.user.id_pegawai
      )
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
  },
  methods: {
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
    async editPendapatan(edit) {
      const { list } = this
      try {
        await this.$store.dispatch('pendapatanlist/updateItem', {
          submit: { id_pendapatan_list: list },
          param: { edit },
        })

        this.$store.commit('pendapatan/SET_EDIT', edit)
        this.$alert(
          'success',
          edit === 1 ? 'Silahkan Mengedit' : 'Selesai Mengedit'
        )
      } catch (e) {
        this.$alert('error', e)
      }
    },
    async updatePendapatan() {
      const { list } = this

      try {
        await this.$store.dispatch('pendapatan/updateItem', {
          list,
        })
        this.$alert('success', 'Successfully Saved')
      } catch (e) {
        this.$alert('error', e)
      }
    },
    async onChangeList() {
      try {
        await this.$store.dispatch('pendapatan/fetchItems', {
          list: this.list,
        })
        this.$alert('success', 'Loaded')
      } catch (e) {
        this.$alert('error', e)
      }
    },
    onChangeTipe(val) {
      this.$refs.pendapatan.onChangeTab(1, val)
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
}
</script>
