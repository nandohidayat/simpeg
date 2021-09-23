<template>
  <div>
    <v-breadcrumbs :items="bread" class="pt-0"></v-breadcrumbs>
    <v-card class="mb-11">
      <v-card-text>
        <v-row no-gutters justify="center" class="mb-4">
          <v-col cols="4">
            <v-card flat outlined>
              <v-card-title class="overline pb-0"
                >Tahun Pendapatan</v-card-title
              >
              <v-card-text>
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
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-card flat outlined>
          <v-data-table
            :headers="headers"
            dense
            :items="pendapatanlist.items"
            show-group-by
            multi-sort
          >
            <template #item.month="{ item }">
              {{ showMonth(item.month) }}
            </template>
            <template #item.distribution="{ item }">
              {{ showDate(item.distribution) }}
            </template>
            <template #item.action="{ item }">
              <a-popconfirm
                :title="`Anda yakin akan me-${
                  item.locked ? 'unlock' : 'lock'
                } data ini?`"
                @confirm="lockItem(item.id_pendapatan_list, item.locked)"
                ><a-button
                  size="small"
                  :type="item.locked ? 'primary' : 'danger'"
                  >{{ item.locked ? 'Unlock' : 'Lock' }}</a-button
                ></a-popconfirm
              >
              <a-button
                size="small"
                class="mr-1"
                @click="openDialog(true, item)"
                >Edit Data</a-button
              >
              <a-popconfirm
                title="Anda yakin akan menghapus data ini?"
                @confirm="deleteItem(item.id_pendapatan_list)"
              >
                <a-button size="small" type="danger">Hapus</a-button>
              </a-popconfirm>
            </template></v-data-table
          >
        </v-card>
      </v-card-text>
    </v-card>
    <v-btn
      color="teal"
      dark
      depressed
      fixed
      bottom
      right
      rounded
      style="bottom: 46px"
      @click="openDialog()"
      ><v-icon small class="mr-1">mdi-plus</v-icon>tambah pendapatan</v-btn
    >
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-title>{{ edit ? 'Edit' : 'Tambah' }} Pendapatan</v-card-title>
        <v-card-text class="py-3">
          <a-config-provider :locale="locale">
            <v-card outlined flat>
              <v-simple-table>
                <tbody>
                  <tr>
                    <td>Title</td>
                    <td>
                      <a-input
                        v-model="submit.title"
                        placeholder="Nama Pendapatan"
                      ></a-input>
                    </td>
                  </tr>
                  <tr>
                    <td>Profil Pendapatan</td>
                    <td>
                      <a-select
                        v-model="submit.id_pendapatan_profil"
                        style="width: 100%"
                        show-search
                        placeholder="Profil"
                        option-filter-prop="label"
                        :options="pendapatanprofil.profils"
                        :filter-option="filterOption"
                      ></a-select>
                    </td>
                  </tr>
                  <tr>
                    <td>Bulan</td>
                    <td>
                      <a-month-picker
                        v-model="submit.month"
                        placeholder="Bulan"
                        style="width: 100%"
                        format="MMMM YYYY"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Tanggal Distribusi</td>
                    <td>
                      <a-date-picker
                        v-model="submit.distribution"
                        placeholder="Tanggal Distribusi"
                        style="width: 100%"
                        format="DD MMMM YYYY"
                      />
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card>
          </a-config-provider>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <a-button class="sim" @click="() => savePermission()"
            >Simpan</a-button
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

moment.locale('id')

const emptySubmit = {
  id_pendapatan_profil: undefined,
  month: null,
  distribution: null,
  title: null,
}

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](8)) {
      return redirect('/404')
    }
  },
  async fetch({ store }) {
    await Promise.all([
      store.dispatch('pendapatanlist/fetchItems', {
        year: moment().year(),
      }),
      store.dispatch('pendapatanprofil/fetchProfils', { select: 1 }),
    ])
  },
  data() {
    return {
      submit: emptySubmit,
      year: moment(),
      locale,
      edit: false,
      dialog: false,
      isOpen: false,
      bread: [
        {
          text: 'Home',
          to: '/',
        },
        {
          text: 'Database',
          to: '/data',
          exact: true,
        },
        {
          text: 'Setup',
          disabled: true,
        },
        {
          text: 'Pendapatan',
          disabled: true,
        },
      ],
      headers: [
        {
          text: 'Title',
          value: 'title',
        },
        {
          text: 'Profil',
          value: 'profil',
        },
        {
          text: 'Bulan',
          value: 'month',
        },
        {
          text: 'Tanggal Distribusi',
          value: 'distribution',
        },
        {
          text: 'Actions',
          value: 'action',
          filterable: false,
        },
      ],
    }
  },
  computed: {
    ...mapState(['pendapatanprofil', 'pendapatanlist']),
  },
  watch: {
    year(val) {
      this.$store.dispatch('pendapatanlist/fetchItems', {
        year: moment(val).year(),
      })
    },
  },
  methods: {
    async savePermission() {
      const { submit, year } = this

      try {
        await this.$store.dispatch(
          `pendapatanlist/${this.edit ? 'update' : 'create'}Item`,
          {
            ...submit,
            month: moment(submit.month).format('YYYY-MM'),
            distribution: moment(submit.distribution).format('YYYY-MM-DD'),
          }
        )

        this.submit = emptySubmit
        this.dialog = false

        this.$alert('success', 'Sukses Menyimpan Data')

        if (!this.edit) {
          this.$store.dispatch('pendapatanlist/fetchItems', {
            year: moment(year).year(),
          })
        }
      } catch (e) {
        this.$alert('error', e)
      }
    },
    async deleteItem(id) {
      try {
        await this.$store.dispatch('pendapatanlist/deleteItem', id)

        this.$alert('success', 'Sukses menghapus data')
      } catch (e) {
        this.$alert('error', e)
      }
    },
    async lockItem(id, locked) {
      try {
        await this.$store.dispatch('pendapatanlist/updateItem', {
          param: { lock: 1 },
          submit: { id_pendapatan_list: id, locked: !locked },
        })
      } catch (e) {
        this.$alert('error', e)
      }
    },
    openDialog(edit = false, data = {}) {
      if (edit) {
        this.edit = true
        this.submit = { ...data }
      } else {
        this.edit = false
        this.submit = emptySubmit
      }
      this.dialog = true
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
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
    showMonth(month) {
      return moment(month).format('MMMM YYYY')
    },
    showDate(month) {
      return moment(month).format('DD MMMM YYYY')
    },
  },
  head() {
    return {
      title: 'List Pendapatan',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Pajak Pendapatan',
        },
      ],
    }
  },
}
</script>
