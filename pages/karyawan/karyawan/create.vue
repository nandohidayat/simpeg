<template>
  <v-card class="pa-4">
    <v-tabs v-model="tab" color="teal">
      <v-tab><v-icon left>mdi-account-outline</v-icon>Account</v-tab>
      <v-tab><v-icon left>mdi-information-outline</v-icon>Information</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <karyawan-account
          :data="karyawan"
          @change-tab="tab = 2"
        ></karyawan-account>
      </v-tab-item>
      <v-tab-item>
        <karyawan-information :data="karyawan"></karyawan-information>
      </v-tab-item>
    </v-tabs-items>
    <v-card-actions>
      <v-spacer> </v-spacer>
      <v-btn color="teal" dark depressed @click="dialog = true"
        >Create Karyawan</v-btn
      >
      <v-btn
        color="warning"
        outlined
        class="ml-3"
        depressed
        :to="{ name: 'karyawan-karyawan' }"
        >Cancel</v-btn
      >
    </v-card-actions>
    <base-confirm
      v-model="dialog"
      text="Save Changes?"
      @confirm="createKaryawan"
    ></base-confirm>
  </v-card>
</template>

<script>
import KaryawanAccount from '@/components/karyawan/karyawan-account'
import KaryawanInformation from '@/components/karyawan/karyawan-information'
import BaseConfirm from '@/components/base/base-confirm'

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](1)) {
      return redirect('/404')
    }
  },
  components: {
    KaryawanAccount,
    KaryawanInformation,
    BaseConfirm,
  },
  data() {
    return {
      tab: undefined,
      dialog: false,
      karyawan: {
        nik: undefined,
        nama: undefined,
        status: undefined,
        email: undefined,
        kelamin: undefined,
        hp: undefined,
        alamat: undefined,
        rekening: undefined,
      },
    }
  },
  methods: {
    async createKaryawan() {
      try {
        await this.$store.dispatch('karyawan/createKaryawan', this.karyawan)

        this.$alert('success', 'Successfully Saved')
        this.$router.push({ name: 'karyawan' })
      } catch (err) {
        this.$alert('error', err)
      } finally {
        this.dialog = false
      }
    },
  },
  head() {
    return {
      title: `Buat Data Karyawan`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Buat Data Karyawan',
        },
      ],
    }
  },
}
</script>
