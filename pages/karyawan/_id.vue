<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <karyawan-menu
          :access="grantedAccount()"
          :delete="grantedDelete()"
        ></karyawan-menu>
      </v-col>
      <v-col cols="9">
        <v-card :loading="loading" outlined>
          <v-card-title id="data-karyawan">
            <v-icon large left>mdi-clipboard-account-outline</v-icon
            ><span class="title font-weight-light">Data Karyawan</span>
            <v-spacer></v-spacer>
            <FormKaryawan
              :edited="true"
              :karyawan="karyawan.karyawan"
              v-if="!loading"
            >
            </FormKaryawan>
          </v-card-title>
          <v-card-text>
            <v-row v-if="!loading">
              <v-col cols="6">
                <span>NIK :</span>
                <span class="subtitle-1 text--primary d-block ml-3">{{
                  karyawan.karyawan.nik
                }}</span>
                <span>Nama :</span>
                <span class="subtitle-1 text--primary d-block ml-3">{{
                  karyawan.karyawan.nama
                }}</span>
              </v-col>
              <v-col cols="6">
                <span>Departemen :</span>
                <span class="subtitle-1 text--primary d-block ml-3">{{
                  karyawan.karyawan.departemen
                }}</span>
                <span>Ruang :</span>
                <span class="subtitle-1 text--primary d-block ml-3">{{
                  karyawan.karyawan.ruang
                }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <ScheduleTable
          id="data-jadwal"
          v-if="!loaded"
          :single="true"
          v-model="value"
        ></ScheduleTable>

        <v-card v-if="grantedAccount()" :loading="loaded" outlined class="mt-5">
          <v-card-title id="data-akses">
            <v-icon large left>mdi-shield-account</v-icon
            ><span class="title font-weight-light">Data Akses</span>
            <v-spacer></v-spacer>
            <v-btn
              v-if="editAccess"
              @click="createUser()"
              text
              icon
              color="teal"
              ><v-icon>mdi-content-save</v-icon></v-btn
            >
            <v-btn v-else @click="editAccess = true" text icon color="teal"
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
          </v-card-title>
          <v-card-text>
            <template v-if="!loaded">
              <v-row v-if="editAccess">
                <v-col cols="4">
                  <v-text-field
                    v-model="newUser.username"
                    label="Username"
                    dense
                    solo
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="newUser.password"
                    label="Password"
                    dense
                    solo
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="newUser.userPassword"
                    label="Your Password"
                    dense
                    solo
                    type="password"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row v-else-if="user.karyawan !== null">
                <v-col cols="6">
                  <span>Username :</span>
                  <span class="subtitle-1 text--primary d-block ml-3">{{
                    user.karyawan.username
                  }}</span>
                </v-col>
                <v-col cols="6">
                  <span>Password :</span>
                  <span class="subtitle-1 text--primary d-block ml-3">
                    *********
                  </span>
                </v-col>
              </v-row>

              <v-row v-else>
                <v-col>
                  Does not have an account. Create one if she/he need it.
                </v-col>
              </v-row>
            </template>
          </v-card-text>
        </v-card>

        <v-card v-if="grantedDelete()" outlined class="mt-5">
          <v-card-title id="hapus-karyawan" class="mb-2">
            <v-icon large left color="error">mdi-alert</v-icon
            ><span class="title font-weight-light error--text"
              >Hapus Karyawan</span
            >
            <v-spacer></v-spacer>
            <v-btn @click="deleteKaryawan" outlined color="error"
              >Hapus Karyawan</v-btn
            >
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import 'moment/locale/id'

import FormKaryawan from '@/components/FormKaryawan.vue'
import ScheduleTable from '@/components/ScheduleTable.vue'
import karyawanMenu from '@/components/karyawan/karyawan-menu'

export default {
  components: {
    FormKaryawan,
    ScheduleTable,
    'karyawan-menu': karyawanMenu
  },
  data: () => ({
    calendar: false,
    value: new Date().toISOString().substr(0, 7),
    loading: true,
    editAccess: false,
    newUser: {
      nik: undefined,
      username: undefined,
      password: undefined,
      userPassword: undefined
    }
  }),
  computed: {
    ...mapState(['departemen', 'ruang', 'karyawan', 'user']),
    dateMoment() {
      return this.value
        ? moment(this.value)
            .locale('id')
            .format('MMMM YYYY')
        : ''
    }
  },
  async created() {
    let fetch = []
    if (!this.departemen.loaded && !this.ruang.loaded) {
      fetch = [
        this.$store.dispatch('departemen/fetchDepartemens'),
        this.$store.dispatch('ruang/fetchRuangs')
      ]
    }
    if (this.grantedAccount()) {
      fetch.push(this.$store.dispatch('user/fetchUser', this.$route.params.id))
    }
    try {
      await Promise.all([
        ...fetch,
        this.$store.dispatch('karyawan/fetchKaryawan', this.$route.params.id)
      ])
      this.loaded = false
      this.newUser.nik = this.karyawan.karyawan.nik
      this.newUser.username = this.user.karyawan.username
    } catch (err) {
      this.$store.dispatch('notification/addError', err)
    }
  },

  methods: {
    async deleteKaryawan() {
      const res = confirm('Apakah anda yakin akan menghapus karyawan ini?')
      if (res) {
        await this.$store.dispatch(
          'karyawan/deleteKaryawan',
          this.karyawan.karyawan.nik
        )
        this.$router.push({ name: 'karyawan-list' })
      }
    },
    async createUser() {
      if (this.newUser.userPassword === undefined) return
      await this.$store.dispatch('user/register', this.newUser)
      await this.$store.dispatch('user/fetchUser', this.$route.params.id)
      this.newUser.userPassword = undefined
      this.editAccess = false
    },
    grantedAccount() {
      return (
        this.user.user.nik === this.$route.params.id ||
        this.user.akses.includes('karyawan-list')
      )
    },
    grantedDelete() {
      return this.user.akses.includes('karyawan-list')
    },
    updateMonth() {
      this.calendar = false
    }
  }
}
</script>

<style scoped></style>
