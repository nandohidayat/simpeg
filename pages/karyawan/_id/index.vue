<template>
  <div>
    <v-card class="px-3">
      <v-card-title>
        Account
      </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="2">
            <v-avatar tile size="150" color="teal">
              <v-icon class="white--text" size="80">mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="5">
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>NIK</p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>{{ karyawan.karyawan.nik }}</p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>Name</p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>{{ karyawan.karyawan.nama }}</p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>Username</p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>{{ karyawan.karyawan.username }}</p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>Email</p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>{{ karyawan.karyawan.email }}</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="5">
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>
                  Departemen
                </p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p v-for="(d, i) in karyawan.karyawan.dept" :key="i">
                  {{ d }}
                </p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>
                  Sub Departemen
                </p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p v-for="(d, i) in karyawan.karyawan.subdept" :key="i">
                  {{ d }}
                </p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>
                  Status
                </p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>
                  {{ karyawan.karyawan.status ? 'Active' : 'Non Active' }}
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div class="my-3"></div>
        <v-btn
          v-if="hadOption(7)"
          color="teal"
          dark
          depressed
          :to="{
            name: 'karyawan-id-edit',
            params: { id: karyawan.karyawan.nik },
          }"
          ><v-icon left>mdi-pencil</v-icon> Edit</v-btn
        >
      </v-card-text>
    </v-card>
    <v-row class="mt-3">
      <v-col cols="6">
        <v-card>
          <v-card-title>Information</v-card-title>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>Jenis Kelamin</p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>
                  {{
                    karyawan.karyawan.kelamin.length !== 0
                      ? karyawan.karyawan.kelamin === 'L'
                        ? 'Laki-laki'
                        : 'Perempuan'
                      : ''
                  }}
                </p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>Alamat</p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>{{ karyawan.karyawan.alamat }}</p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>No HP</p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>{{ karyawan.karyawan.hp }}</p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>No Rekening</p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>{{ karyawan.karyawan.rekening }}</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Change Password</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="current"
              label="Current Password"
              outlined
              type="password"
              dense
              :error-messages="currentMessage"
              :error="currentError"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="New Password"
              outlined
              type="password"
              :error="passwordError"
              :error-messages="passwordMessage"
              dense
            ></v-text-field>
            <v-text-field
              v-model="repeat"
              label="Confirm Password"
              outlined
              type="password"
              :error="repeatError"
              :error-messages="repeatMessage"
              dense
            ></v-text-field>
            <div class="text-right">
              <v-btn
                depressed
                color="teal"
                dark
                :disabled="confirmDisable"
                @click="confirm = true"
                >Change Password</v-btn
              >
            </div>
            <base-confirm
              v-model="confirm"
              text="Change Password?"
              @confirm="changePassword()"
            ></base-confirm>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BaseConfirm from '@/components/base/base-confirm'

export default {
  middleware({ route, $auth, redirect }) {
    if (
      parseInt(route.params.id) !== parseInt($auth.user.nik) &&
      !$auth.user.akses.includes('/karyawan')
    ) {
      return redirect('/404')
    }
  },
  components: {
    BaseConfirm,
  },
  async fetch({ params, store, redirect }) {
    try {
      await store.dispatch('karyawan/fetchKaryawan', params.id)
    } catch (err) {
      redirect('/404')
    }
  },
  data() {
    return {
      current: undefined,
      currentError: false,
      currentMessage: undefined,
      password: undefined,
      passwordError: false,
      passwordMessage: undefined,
      repeat: undefined,
      repeatError: false,
      repeatMessage: undefined,
      confirm: false,
      confirmDisable: true,
      submited: false,
    }
  },
  computed: {
    ...mapState(['karyawan']),
    ...mapGetters('user', ['hadOption']),
    passError() {
      return this.password + this.repeat
    },
  },
  watch: {
    passError(val) {
      if (this.repeat !== this.password && !this.submited) {
        this.repeatError = true
        this.repeatMessage = 'Confirm is different with Password'
        this.confirmDisable = true
      } else {
        this.repeatError = false
        this.repeatMessage = undefined
        this.confirmDisable = false
      }
    },
    password(val) {
      if (this.password === undefined && !this.submited) {
        this.passwordError = true
        this.passwordMessage = 'Password could not be empty'
        this.confirmDisable = true
      } else {
        this.passwordError = false
        this.passwordMessage = undefined
        this.confirmDisable = false
      }
    },
  },
  methods: {
    async changePassword() {
      try {
        await this.$store.dispatch('user/password', {
          id: this.karyawan.karyawan.id,
          current: this.current,
          password: this.password,
        })

        this.submited = true
        this.current = undefined
        this.password = undefined
        this.repeat = undefined
        this.currentError = false
        this.currentMessage = undefined
        this.$alert('success', 'Successfully Changed')
      } catch (err) {
        this.currentError = true
        this.currentMessage = 'Password mismatch'
        this.$alert('error', err)
      } finally {
        this.confirm = false
      }
    },
  },
  head() {
    return {
      title: this.karyawan.karyawan.nama,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Detail Karyawan',
        },
      ],
    }
  },
}
</script>
