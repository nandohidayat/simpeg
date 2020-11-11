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
                <p>{{ karyawan.karyawan.id }}</p>
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
            <v-row no-gutters>
              <v-col cols="4" class="body-1 font-weight-medium">
                <p>No Absen</p>
              </v-col>
              <v-col cols="8" class="body-1 font-weight-regular">
                <p>{{ karyawan.karyawan.nik }}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div class="my-3"></div>
        <v-btn
          v-if="hadAkses(7)"
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
    <v-card class="mt-3 px-3">
      <v-card-title>Information</v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="6">
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
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  middleware({ store, route, $auth, redirect }) {
    if (
      parseInt(route.params.id) !== parseInt($auth.user.nik) &&
      !store.getters['user/hadAkses'](1)
    ) {
      return redirect('/404')
    }
  },
  async fetch({ params, store, redirect }) {
    try {
      await store.dispatch('karyawan/fetchKaryawan', params.id)
    } catch (err) {
      redirect('/404')
    }
  },
  computed: {
    ...mapState(['karyawan']),
    ...mapGetters('user', ['hadAkses']),
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
