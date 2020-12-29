<template>
  <v-dialog
    v-model="dialog"
    width="700"
    @click:outside="$emit('update:dialog', false)"
  >
    <v-card>
      <v-card-title>{{ edit ? 'Edit' : 'Tambah' }} Departemen</v-card-title>
      <v-card-text class="py-3">
        <v-card outlined flat>
          <v-simple-table>
            <tbody>
              <tr>
                <td>
                  Nama Departemen
                </td>
                <td>
                  <a-input
                    v-model="realNama"
                    placeholder="Nama Departemen"
                  ></a-input>
                </td>
              </tr>
              <tr>
                <td>
                  Nama Jabatan
                </td>
                <td>
                  <a-input
                    v-model="realJabatan"
                    placeholder="Nama Jabatan"
                  ></a-input>
                </td>
              </tr>
              <tr>
                <td>
                  Kepala Bagian
                </td>
                <td>
                  <a-select
                    v-model="realIdPegawai"
                    style="min-width: 300px;"
                    show-search
                    placeholder="Kepala Bagian"
                    option-filter-prop="label"
                    :options="optionKaryawan"
                    :filter-option="filterOption"
                  ></a-select>
                </td>
              </tr>
              <tr v-if="edit">
                <td>
                  Nama Folder
                </td>
                <td>
                  <a-input
                    v-model="realFolder"
                    placeholder="Nama Folder"
                  ></a-input>
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
    idDept: {
      type: [Number, String],
      default: undefined,
    },
    nama: {
      type: String,
      default: '',
    },
    jabatan: {
      type: String,
      default: '',
    },
    folder: {
      type: String,
      default: '',
    },
    idPegawai: {
      type: [Number, String],
      default: undefined,
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['karyawan']),
    realNama: {
      get() {
        return this.nama
      },
      set(val) {
        this.$emit('update:nama', val)
      },
    },
    realJabatan: {
      get() {
        return this.jabatan
      },
      set(val) {
        this.$emit('update:jabatan', val)
      },
    },
    realFolder: {
      get() {
        return this.folder
      },
      set(val) {
        this.$emit('update:folder', val)
      },
    },
    realIdPegawai: {
      get() {
        return this.idPegawai
      },
      set(val) {
        this.$emit('update:id-pegawai', val)
      },
    },
    optionKaryawan() {
      if (
        this.karyawan.karyawans.length > 0 &&
        this.karyawan.karyawans[0].label
      ) {
        return this.karyawan.karyawans
      } else {
        return []
      }
    },
  },
  methods: {
    async savePermission() {
      const submit = {
        id_dept: this.idDept,
        nama: this.nama,
        jabatan: this.jabatan,
        folder: this.folder,
        id_pegawai: this.idPegawai,
      }

      try {
        await this.$store.dispatch(
          `departemen/${this.edit ? 'update' : 'create'}Departemen`,
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
