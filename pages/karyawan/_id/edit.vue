<template>
  <v-card class="pa-4">
    <v-tabs v-model="tab" color="teal">
      <v-tab><v-icon left>mdi-account-outline</v-icon>Account</v-tab>
      <v-tab><v-icon left>mdi-information-outline</v-icon>Information</v-tab>
      <v-tab>
        <v-icon left>mdi-share-variant-outline</v-icon>Mutasi Departemen
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <karyawan-account
          :data="karyawan.karyawan"
          edit
          @change-tab="tab = 2"
          @delete-account="karyawan.karyawan.username = undefined"
        ></karyawan-account>
      </v-tab-item>
      <v-tab-item>
        <karyawan-information :data="karyawan.karyawan"></karyawan-information>
      </v-tab-item>
      <v-tab-item>
        <karyawan-departemen :id="karyawan.karyawan.id"></karyawan-departemen>
      </v-tab-item>
    </v-tabs-items>
    <v-card-actions>
      <v-spacer> </v-spacer>
      <v-btn color="teal" dark depressed @click="dialog = true"
        >Save Changes</v-btn
      >
      <v-btn
        color="warning"
        outlined
        class="ml-3"
        depressed
        :to="{ name: 'karyawan-id', params: { id: karyawan.karyawan.nik } }"
        >Cancel</v-btn
      >
    </v-card-actions>
    <base-confirm
      v-model="dialog"
      text="Save Changes?"
      @confirm="updateKaryawan"
    ></base-confirm>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import KaryawanAccount from '@/components/karyawan/karyawan-account'
import KaryawanInformation from '@/components/karyawan/karyawan-information'
import KaryawanDepartemen from '@/components/karyawan/karyawan-departemen'
import BaseConfirm from '@/components/base/base-confirm'

export default {
  middleware({ store, redirect }) {
    if (!store.getters['user/hadAkses'](7)) {
      return redirect('/404')
    }
  },
  components: {
    KaryawanAccount,
    KaryawanInformation,
    KaryawanDepartemen,
    BaseConfirm,
  },
  async fetch({ params, store, route }) {
    try {
      await Promise.all([
        store.dispatch('karyawan/fetchKaryawan', params.id),
        store.dispatch('logdepartemen/fetchLog', params.id),
        store.dispatch('departemen/fetchDepartemens'),
      ])
    } catch (err) {
      route.redirect('/404')
    }
  },
  data() {
    return {
      tab: undefined,
      dialog: false,
    }
  },
  computed: {
    ...mapState(['karyawan']),
  },
  methods: {
    async updateKaryawan() {
      try {
        await this.$store.dispatch(
          'karyawan/updateKaryawan',
          this.karyawan.karyawan
        )

        this.dialog = false
        this.$alert('success', 'Successfully Saved')
        this.$router.push({
          name: 'karyawan-id',
          params: { id: this.$route.params.id },
        })
      } catch (err) {
        this.$alert('error', err)
      }
    },
  },
  head() {
    return {
      title: `Edit ${this.karyawan.karyawan.nama}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Edit Karyawan',
        },
      ],
    }
  },
}
</script>
