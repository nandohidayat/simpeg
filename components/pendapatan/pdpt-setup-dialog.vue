<template>
  <v-dialog
    v-model="dialog"
    width="700"
    @click:outside="$emit('update:dialog', false)"
  >
    <v-card>
      <v-card-title>{{ edit ? 'Edit' : 'Tambah' }} Pendapatan</v-card-title>
      <v-card-text class="py-3">
        <v-card outlined flat>
          <v-simple-table>
            <tbody>
              <tr>
                <td>
                  Nama Pendapatan
                </td>
                <td>
                  <a-input
                    v-model="realTitle"
                    placeholder="Nama Pendapatan"
                  ></a-input>
                </td>
              </tr>
              <tr>
                <td>
                  View
                </td>
                <td>
                  <a-input v-model="realView" placeholder="View"></a-input>
                </td>
              </tr>
              <tr>
                <td>
                  View
                </td>
                <td>
                  <a-input v-model="realView" placeholder="View"></a-input>
                </td>
              </tr>
              <tr>
                <td>
                  Personalia
                </td>
                <td>
                  <a-textarea
                    v-model="realPersonalia"
                    placeholder="Personalia"
                    auto-size
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Keuangan
                </td>
                <td>
                  <a-textarea
                    v-model="realKeuangan"
                    placeholder="Keuangan"
                    auto-size
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Active
                </td>
                <td>
                  <a-checkbox v-model="realActive"></a-checkbox>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <a-button class="sim" @click="() => savePermission()">Simpan</a-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    idPdpt: {
      type: [Number, String],
      default: undefined,
    },
    title: {
      type: String,
      default: '',
    },
    view: {
      type: String,
      default: '',
    },
    personalia: {
      type: String,
      default: '',
    },
    keuangan: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['karyawan']),
    realTitle: {
      get() {
        return this.title
      },
      set(val) {
        this.$emit('update:title', val)
      },
    },
    realView: {
      get() {
        return this.view
      },
      set(val) {
        this.$emit('update:view', val)
      },
    },
    realPersonalia: {
      get() {
        return this.personalia
      },
      set(val) {
        this.$emit('update:personalia', val)
      },
    },
    realKeuangan: {
      get() {
        return this.keuangan
      },
      set(val) {
        this.$emit('update:personalia', val)
      },
    },
    realActive: {
      get() {
        return this.active
      },
      set(val) {
        this.$emit('update:active', val)
      },
    },
  },
  methods: {
    async savePermission() {
      const { idPdpt, title, view, personalia, keuangan, active } = this
      const submit = {
        id_pendapatan_profil: idPdpt,
        title,
        view,
        personalia,
        keuangan,
        active,
      }

      try {
        await this.$store.dispatch(
          `pendapatanprofil/${this.edit ? 'update' : 'create'}Profil`,
          submit
        )
        this.$emit('update:dialog', false)

        this.$alert('success', 'Sukses Menyimpan Data')
      } catch (e) {
        this.$alert('error', e)
      }
    },
    filterOption(input, option) {
      return option.componentOptions.children[0].text
        .toLowerCase()
        .includes(input.toLowerCase())
    },
  },
}
</script>
