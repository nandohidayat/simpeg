<template>
  <v-main class="grey lighten-4 pb-7">
    <v-app-bar
      app
      color="white"
      style="z-index: 999; padding: 0"
      tile
      dense
      class="main-layout px-5"
    >
      <a-menu v-model="current" mode="horizontal" style="width: 100%">
        <a-sub-menu v-if="hadSubmenu(1)">
          <span slot="title"><a-icon type="user" />Karyawan</span>
          <a-menu-item v-if="hadAkses(1)" key="karyawan-karyawan">
            <nuxt-link :to="{ name: 'karyawan-karyawan' }">
              Daftar Karyawan
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu v-if="hadSubmenu(2)">
          <span slot="title"><a-icon type="schedule" />Jadwal</span>
          <a-menu-item v-if="hadAkses(2)" key="karyawan-jadwal">
            <nuxt-link :to="{ name: 'karyawan-jadwal' }">
              Jadwal Karyawan
            </nuxt-link>
          </a-menu-item>
          <a-menu-item v-if="hadAkses(10)" key="karyawan-jadwal-absen">
            <nuxt-link :to="{ name: 'karyawan-jadwal-absen' }">
              Absen Karyawan
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu v-if="hadSubmenu(3)">
          <span slot="title"><a-icon type="dollar" />Pendapatan</span>
          <a-menu-item v-if="hadAkses(8)" key="karyawan-pendapatan">
            <nuxt-link :to="{ name: 'karyawan-pendapatan' }">
              Daftar Pendapatan
            </nuxt-link>
          </a-menu-item>
          <a-menu-item v-if="hadAkses(11)" key="karyawan-pendapatan-template">
            <nuxt-link :to="{ name: 'karyawan-pendapatan-template' }">
              Template Pendapatan
            </nuxt-link>
          </a-menu-item>
          <a-menu-item v-if="hadAkses(12)" key="karyawan-pendapatan-email">
            <nuxt-link :to="{ name: 'karyawan-pendapatan-email' }">
              Email Pendapatan
            </nuxt-link>
          </a-menu-item>
          <a-menu-item v-if="hadAkses(9)" key="karyawan-pendapatan-manage">
            <nuxt-link :to="{ name: 'karyawan-pendapatan-manage' }">
              Manage Template
            </nuxt-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </v-app-bar>

    <v-container fluid class="px-10 pb-5">
      <nuxt-child />
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      current: [],
    }
  },
  computed: {
    ...mapGetters('user', ['hadSubmenu', 'hadAkses']),
  },
  created() {
    this.current = [this.$route.name]
  },
}
</script>
